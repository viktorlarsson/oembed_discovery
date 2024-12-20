import type { VercelRequest, VercelResponse } from '@vercel/node';
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";

import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';
import { OEmbedResponse } from '../src/types/oembed';



async function discoverEndpointFromHtml(url: string): Promise<string | null> {
    const browser = await puppeteer.launch({
        args: [
            ...chromium.args,
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage",
            "--disable-gpu",
        ],
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(),
        headless: chromium.headless,
    });

    const page = await browser.newPage();

    try {
        console.log("Setting up anti-detection measures...");
        await page.setUserAgent(
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36"
        );

        await page.setViewport({
            width: Math.floor(Math.random() * (1920 - 800) + 800),
            height: Math.floor(Math.random() * (1080 - 600) + 600),
        });

        await page.setExtraHTTPHeaders({
            "Accept-Language": "en-US,en;q=0.9",
            Referer: "https://www.google.com",
        });

        console.log("Navigating to URL...");
        await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });

        const html = await page.content();
        console.log("PAGE HTML DUMP:", html);

        // Attempt to find oEmbed links
        const oembedLink = await page.evaluate(() => {
            const selectors = [
                'link[type="application/json+oembed"]',
                'link[type="text/json+oembed"]',
                'link[type="application/xml+oembed"]',
                'link[type="text/xml+oembed"]',
            ];
            for (const selector of selectors) {
                const link = document.querySelector(selector);
                if (link?.getAttribute("href")) {
                    return link.getAttribute("href");
                }
            }
            return null;
        });

        if (oembedLink) {
            return oembedLink;
        }

        // Check for Open Graph video/audio providers
        const mediaUrl = await page.evaluate(() => {
            const ogVideo = document.querySelector('meta[property="og:video:url"]');
            const ogAudio = document.querySelector('meta[property="og:audio:url"]');
            return ogVideo?.getAttribute("content") || ogAudio?.getAttribute("content") || null;
        });

        if (mediaUrl) {
            return constructOEmbedEndpoint(mediaUrl);
        }

        // Check for Twitter cards
        const twitterPlayer = await page.evaluate(() => {
            const twitterCard = document.querySelector('meta[name="twitter:card"]');
            const twitterPlayer = document.querySelector('meta[name="twitter:player"]');
            if (twitterCard && twitterPlayer) {
                return twitterPlayer.getAttribute("content");
            }
            return null;
        });

        if (twitterPlayer) {
            return constructOEmbedEndpoint(twitterPlayer);
        }

        // Check for schema.org VideoObject
        const schemaData = await page.evaluate(() => {
            const schemaScript = document.querySelector('script[type="application/ld+json"]');
            if (schemaScript) {
                try {
                    const schema = JSON.parse(schemaScript.textContent || "");
                    if (schema["@type"] === "VideoObject" && schema.embedUrl) {
                        return schema.embedUrl;
                    }
                } catch (e) {
                    console.error("Error parsing schema.org data:", e);
                }
            }
            return null;
        });

        if (schemaData) {
            return constructOEmbedEndpoint(schemaData);
        }

        return null;
    } catch (error) {
        console.error("Error parsing HTML:", error);
        return null;
    } finally {
        await browser.close();
    }
}

async function discoverOembedData(url: string): Promise<OEmbedResponse> {
  try {
    const oembedEndpoint = await discoverEndpointFromHtml(url);

    if (!oembedEndpoint) {
      throw new Error('No oEmbed endpoint found for this URL');
    }

    // Add the target URL as a parameter
    const finalUrl = new URL(oembedEndpoint);
    finalUrl.searchParams.set('url', url);
    finalUrl.searchParams.set('format', 'json');
    finalUrl.searchParams.set('maxwidth', '800');
    finalUrl.searchParams.set('maxheight', '600');

    // Fetch the oEmbed data
    const response = await fetch(finalUrl.toString(), {
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36'
      }
    });

    console.log(response)
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch oEmbed data: ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    return data as OEmbedResponse;
  } catch (error) {
    console.error('Error discovering oEmbed:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to discover oEmbed data');
  }
}

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  if (request.method !== 'GET') {
    return response.status(405).json({ error: 'Method not allowed' });
  }
console.log("GETTING URL", request.query.url );
console.log("GETTING URL", request.query )

  const url = request.query.url as string;

  if (!url) {
    return response.status(400).json({ error: 'URL parameter is required' });
  }

  try {
    const data = await discoverOembedData(url);
    return response.status(200).json(data);
  } catch (error) {
    return response
      .status(404)
      .json({ error: error instanceof Error ? error.message : 'No oEmbed data found' });
  }
}