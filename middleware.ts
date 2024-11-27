import { MiddlewareRequest, MiddlewareResponse } from "vite-vercel/server";
import { discoverOembedData } from "./api/oembedService";

export default async (req: MiddlewareRequest) => {
  const url = new URL(req.url);

  // Handle oEmbed API
  if (url.pathname === "/api/oembed") {
    try {
      const targetUrl = url.searchParams.get("url");

      if (!targetUrl) {
        return new Response(
          JSON.stringify({ error: "URL parameter is required" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }

      const data = await discoverOembedData(targetUrl);

      return new Response(JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      return new Response(
        JSON.stringify({
          error: error instanceof Error ? error.message : "No oEmbed data found",
        }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }
  }

  // Other middleware logic
  if (url.pathname === "/from-middleware") {
    return new Response("from middleware");
  }

  // Rewrite to another URL
  if (url.pathname === "/todo") {
    return MiddlewareResponse.rewrite(
      "https://jsonplaceholder.typicode.com/todos/1"
    );
  }

  // Continue serving `index.html`
  return MiddlewareResponse.next();
};