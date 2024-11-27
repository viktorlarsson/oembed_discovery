import type { VercelRequest, VercelResponse } from '@vercel/node';
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";

import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';
import { OEmbedResponse } from '../src/types/oembed';


async function getBrowser() {
  if (process.env.VERCEL_ENV === "production") {
    const executablePath = await chromium.executablePath();

    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath,
      headless: chromium.headless,
    });
    return browser;
  } else {
    const browser = await puppeteer.launch();
    return browser;
  }
}

async function discoverEndpointFromHtml(url: string): Promise<string | null> {
    const browser = await getBrowser();
    const page = await browser.newPage();

    // Listen for console logs from the page
    page.on('console', (msg) => console.log('PAGE LOG:', msg.text()));

    try {
        console.log("Navigating to URL...");
        await page.goto(url);

        const oembedLink = await page.evaluate(() => {
            console.log("Inside browser context");
            const link = document.querySelector(
                'link[rel="alternate"][type="application/json+oembed"]'
            );
            return link ? link.getAttribute('href') : null;
        });

        return oembedLink;
    } catch (error) {
        console.error('Error parsing HTML:', error);
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