import React from 'react';

interface RawHtmlProps {
  html: string;
  className?: string;
}

export function RawHtml({ html, className = '' }: RawHtmlProps) {
  return (
    <div 
      className={`raw-html-container ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}