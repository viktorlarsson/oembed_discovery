import React from 'react';
import { Github } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-12 pb-8 text-center text-sm text-gray-500">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">About oEmbed Discovery Tool</h2>
        <p className="mb-4">
          Our free online tool helps developers and content creators test oEmbed implementations
          before adding them to their websites. Support for major platforms including YouTube,
          Vimeo, Twitter, Instagram, and more.
        </p>
        <div className="flex justify-center gap-6 mb-4">
          <a
            href="https://oembed.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            oEmbed Spec
          </a>
          <a
            href="https://github.com/yourusername/oembed-discovery"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-blue-600 hover:underline"
          >
            <Github className="w-4 h-4" />
            Source Code
          </a>
        </div>
        <p>© {new Date().getFullYear()} oEmbed Discovery Tool. Made with ❤️ for the web community.</p>
      </div>
    </footer>
  );
}