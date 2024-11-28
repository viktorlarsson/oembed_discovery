import React, { useEffect, useRef } from 'react';
import { sanitizeHtml } from './utils';
import type { RawHtmlRendererProps } from './types';

export function RawHtmlRenderer({ html, className = '', onLoad, onError }: RawHtmlRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !html) return;

    const container = containerRef.current;
    const sanitizedHtml = sanitizeHtml(html);
    container.innerHTML = sanitizedHtml;

    // Handle scripts if present
    const scripts = container.getElementsByTagName('script');
    Array.from(scripts).forEach(oldScript => {
      const newScript = document.createElement('script');
      Array.from(oldScript.attributes).forEach(attr => {
        newScript.setAttribute(attr.name, attr.value);
      });
      newScript.appendChild(document.createTextNode(oldScript.innerHTML));
      oldScript.parentNode?.replaceChild(newScript, oldScript);
    });

    // Handle iframes
    const iframes = container.getElementsByTagName('iframe');
    Array.from(iframes).forEach(iframe => {
      iframe.onload = () => onLoad?.();
      iframe.onerror = () => onError?.('Failed to load embedded content');
    });

    return () => {
      container.innerHTML = '';
    };
  }, [html, onLoad, onError]);

  if (!html) {
    return null;
  }

  return (
    <div 
      ref={containerRef}
      className={`raw-html-renderer ${className}`}
      data-testid="raw-html-container"
    />
  );
}