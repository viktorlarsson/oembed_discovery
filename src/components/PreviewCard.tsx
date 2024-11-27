import React from 'react';
import { ExternalLink, Image as ImageIcon, Video, Link as LinkIcon, Code } from 'lucide-react';
import type { OEmbedResponse } from '../types/oembed';

interface PreviewCardProps {
  data: OEmbedResponse;
}

export function PreviewCard({ data }: PreviewCardProps) {
  const getIcon = () => {
    switch (data.type) {
      case 'photo':
        return <ImageIcon className="w-6 h-6" />;
      case 'video':
        return <Video className="w-6 h-6" />;
      case 'rich':
        return <Code className="w-6 h-6" />;
      default:
        return <LinkIcon className="w-6 h-6" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl w-full">
      <div className="flex items-center gap-3 mb-4">
        {getIcon()}
        <h2 className="text-xl font-semibold">{data.title || 'Untitled'}</h2>
      </div>

      <div className="space-y-4">
        {data.html && (
          <div 
            className="border rounded-lg p-4 bg-gray-50"
            dangerouslySetInnerHTML={{ __html: data.html }}
          />
        )}

        {data.thumbnail_url && (
          <img
            src={data.thumbnail_url}
            alt="Preview"
            className="rounded-lg max-w-full h-auto"
            width={data.thumbnail_width}
            height={data.thumbnail_height}
          />
        )}

        <div className="grid grid-cols-2 gap-4 text-sm">
          {data.author_name && (
            <div>
              <span className="font-semibold">Author:</span>
              {data.author_url ? (
                <a href={data.author_url} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-500 hover:underline">
                  {data.author_name}
                </a>
              ) : (
                <span className="ml-2">{data.author_name}</span>
              )}
            </div>
          )}

          {data.provider_name && (
            <div>
              <span className="font-semibold">Provider:</span>
              {data.provider_url ? (
                <a href={data.provider_url} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-500 hover:underline">
                  {data.provider_name}
                </a>
              ) : (
                <span className="ml-2">{data.provider_name}</span>
              )}
            </div>
          )}
        </div>

        <div className="mt-4 pt-4 border-t">
          <h3 className="font-semibold mb-2">Technical Details</h3>
          <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
            <div>Type: {data.type}</div>
            <div>Version: {data.version || 'N/A'}</div>
            {data.width && <div>Width: {data.width}px</div>}
            {data.height && <div>Height: {data.height}px</div>}
            {data.cache_age && <div>Cache Age: {data.cache_age}s</div>}
          </div>
        </div>
      </div>
    </div>
  );
}