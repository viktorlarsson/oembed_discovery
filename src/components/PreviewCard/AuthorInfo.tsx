import React from 'react';
import { ExternalLink } from 'lucide-react';
import type { OEmbedResponse } from '../../types/oembed';

interface AuthorInfoProps {
  data: OEmbedResponse;
}

export function AuthorInfo({ data }: AuthorInfoProps) {
  if (!data.author_name && !data.provider_name) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 gap-4 text-sm">
      {data.author_name && (
        <div className="flex items-center">
          <span className="font-semibold">Author:</span>
          {data.author_url ? (
            <a 
              href={data.author_url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="ml-2 text-blue-500 hover:underline flex items-center gap-1"
            >
              {data.author_name}
              <ExternalLink className="w-3 h-3" />
            </a>
          ) : (
            <span className="ml-2">{data.author_name}</span>
          )}
        </div>
      )}

      {data.provider_name && (
        <div className="flex items-center">
          <span className="font-semibold">Provider:</span>
          {data.provider_url ? (
            <a 
              href={data.provider_url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="ml-2 text-blue-500 hover:underline flex items-center gap-1"
            >
              {data.provider_name}
              <ExternalLink className="w-3 h-3" />
            </a>
          ) : (
            <span className="ml-2">{data.provider_name}</span>
          )}
        </div>
      )}
    </div>
  );
}