import type { VercelRequest, VercelResponse } from '@vercel/node';

import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';
import { OEmbedResponse } from '../src/types/oembed';

async function discoverEndpointFromHtml(url: string): Promise<string | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch HTML: ${response.statusText}`);
    }
    
    const html = await response.text();
    const dom = new JSDOM(html);
    const document = dom.window.document;

    const oembedLink = document.querySelector(
      'link[type="application/json+oembed"], link[type="text/json+oembed"]'
    );

    return oembedLink?.getAttribute('href') || null;
  } catch (error) {
    console.error('Error parsing HTML:', error);
    return null;
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
        'Accept': 'application/json',
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