import React, { useState } from 'react';
import type { OEmbedResponse } from '../../types/oembed';
import { AlertCircle } from 'lucide-react';
import { RawHtmlRenderer } from '../RawHtmlRenderer';

interface MediaPreviewProps {
  data: OEmbedResponse;
}

export function MediaPreview({ data }: MediaPreviewProps) {
  const [error, setError] = useState<string | null>(null);

  if (data.html) {
    return (
      <div className="space-y-2">
        <div className="relative w-full aspect-video">
          <RawHtmlRenderer 
            html={data.html} 
            className="w-full h-full rounded-lg overflow-hidden"
            onError={(err) => setError(err)}
          />
        </div>
        {error && (
          <div className="flex items-center gap-2 text-red-600 text-sm">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}
      </div>
    );
  }

  if (data.thumbnail_url) {
    return (
      <img
        src={data.thumbnail_url}
        alt={data.title || 'Preview'}
        className="rounded-lg max-w-full h-auto"
        width={data.thumbnail_width}
        height={data.thumbnail_height}
      />
    );
  }

  return null;
}