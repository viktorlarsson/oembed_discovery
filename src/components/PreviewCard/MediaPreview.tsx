import React from 'react';
import { RawHtml } from './RawHtml';
import type { OEmbedResponse } from '../../types/oembed';

interface MediaPreviewProps {
  data: OEmbedResponse;
}

export function MediaPreview({ data }: MediaPreviewProps) {
  if (data.html) {
    return (
      <div className="relative w-full aspect-video">
        <RawHtml 
          html={data.html} 
          className="w-full h-full rounded-lg overflow-hidden"
        />
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