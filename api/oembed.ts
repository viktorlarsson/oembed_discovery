import type { VercelRequest, VercelResponse } from '@vercel/node';
import { discoverOembedData } from './oembedService';


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