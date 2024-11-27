import React from 'react';
import type { OEmbedResponse } from '../../types/oembed';

interface TechnicalDetailsProps {
  data: OEmbedResponse;
}

export function TechnicalDetails({ data }: TechnicalDetailsProps) {
  return (
    <div className="mt-4 pt-4 border-t">
      <h3 className="font-semibold mb-2">Technical Details</h3>
      <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
        <div>Type: {data.type}</div>
        <div>Version: {data.version || 'N/A'}</div>
        {data.width && <div>Width: {data.width}px</div>}
        {data.height && <div>Height: {data.height}px</div>}
        {data.cache_age && <div>Cache Age: {data.cache_age}s</div>}
        <div>Raw Tags: {data.html ? 'Yes' : 'No'}</div>
      </div>
      {data.html && (
        <div className="mt-4">
          <details>
            <summary className="cursor-pointer text-sm text-blue-600 hover:text-blue-800">
              View Raw HTML
            </summary>
            <pre className="mt-2 p-4 bg-gray-50 rounded-lg overflow-x-auto text-xs">
              {data.html}
            </pre>
          </details>
        </div>
      )}
    </div>
  );
}