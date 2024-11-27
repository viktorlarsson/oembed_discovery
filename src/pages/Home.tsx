import React, { useState } from 'react';
import { URLInput } from '../components/URLInput';
import { PreviewCard } from '../components/PreviewCard';
import { Loader2 } from 'lucide-react';
import type { OEmbedResponse } from '../types/oembed';
import { discoverOembed } from '../utils/oembed';

export function Home() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [oembedData, setOembedData] = useState<OEmbedResponse | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await discoverOembed(url);
      if (data) {
        setOembedData(data);
      } else {
        setError('No oEmbed data found for this URL');
      }
    } catch (err) {
      setError('Failed to fetch oEmbed data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <URLInput
        url={url}
        onUrlChange={setUrl}
        onSubmit={handleSubmit}
      />

      {loading && (
        <div className="flex items-center gap-2 text-blue-600">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Discovering oEmbed data...</span>
        </div>
      )}

      {error && (
        <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg">
          {error}
        </div>
      )}

      {oembedData && <PreviewCard data={oembedData} />}
    </div>
  );
}