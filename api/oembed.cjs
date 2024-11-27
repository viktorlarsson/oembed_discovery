export const config = {
    runtime: 'edge',
  };
   
import { discoverOembedData } from "../src/server/oembedService";

export default async (request) => {
    try {
      const { searchParams } = new URL(request.url);
      const url = searchParams.get('url');
  
      if (!url) {
        return new Response(JSON.stringify({ error: 'URL parameter is required' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
  
      const data = await discoverOembedData(url);
  
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      return new Response(
        JSON.stringify({
          error: error instanceof Error ? error.message : 'No oEmbed data found',
        }),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
  };