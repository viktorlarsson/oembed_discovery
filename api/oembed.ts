import type { VercelRequest, VercelResponse } from '@vercel/node';

async function discoverOembedData(url: string) {
  try {
    const response = await fetch(url, { method: 'GET' });
    if (!response.ok) {
      throw new Error('Failed to fetch oEmbed data');
    }

    // Extract the oEmbed data from the response (you might need to adjust parsing based on response structure)
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('No oEmbed data found or invalid URL');
  }
}

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  if (request.method !== 'GET') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

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