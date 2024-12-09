import React from "react";
import { Search } from "lucide-react";

interface URLInputProps {
  url: string;
  onUrlChange: (url: string) => void;
  onSubmit: () => void;
}

export function URLInput({ url, onUrlChange, onSubmit }: URLInputProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl">
      <label htmlFor="url-input" className="sr-only">
        Enter URL to test oEmbed discovery
      </label>
      <div className="relative">
        <input
          id="url-input"
          type="url"
          value={url}
          onChange={(e) => onUrlChange(e.target.value)}
          placeholder="Enter URL to test oEmbed discovery (e.g., YouTube, Vimeo, Twitter)"
          className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
          aria-label="URL to test"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-blue-500"
          aria-label="Discover oEmbed data"
        >
          <Search className="w-5 h-5" />
        </button>
      </div>
      <p className="mt-2 text-sm text-gray-500">
        Try with Vimeo links, Soundcloud, or any website that supports oEmbed
        and does not block scrapers in a more sofisticated manner (like
        Youtube).
      </p>
    </form>
  );
}
