import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { discoverOembedData } from './src/server/oembedService';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'oembed-middleware',
      configureServer(server) {
        server.middlewares.use('/api/oembed', async (req, res) => {
          try {
            const url = new URL(req.url!, `http://${req.headers.host}`).searchParams.get('url');
            
            if (!url) {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: 'URL parameter is required' }));
              return;
            }

            const data = await discoverOembedData(url);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(data));
          } catch (error) {
            res.statusCode = 404;
            res.end(JSON.stringify({ 
              error: error instanceof Error ? error.message : 'No oEmbed data found' 
            }));
          }
        });
      }
    }
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});