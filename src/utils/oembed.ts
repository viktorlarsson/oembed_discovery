import type { OEmbedResponse } from '../types/oembed';

export async function discoverOembed(url: string): Promise<OEmbedResponse | null> {
  try {
    const response = await fetch(`/api/oembed?url=${encodeURIComponent(url)}`);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch oEmbed data');
    }
    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error discovering oEmbed:', error.message);
    }
    throw error;
  }
}