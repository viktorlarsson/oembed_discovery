import React from 'react';
import { Link } from 'react-router-dom';
import { Share2, BookOpen } from 'lucide-react';

export function Header() {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center gap-3 mb-2">
        <Share2 className="w-8 h-8 text-blue-600" />
        <h1 className="text-3xl font-bold text-gray-900">oEmbed Discovery Tool</h1>
      </div>
      <p className="text-gray-600 max-w-2xl mx-auto">
        Instantly test and preview embeds from any website. Support for YouTube, Vimeo, Twitter, and more.
        Perfect for developers, content creators, and social media managers.
      </p>
      <div className="mt-4 text-sm text-gray-500">
        <p>Simply paste a URL and get instant previews with technical details.</p>
        <p>No API keys required • Free to use</p>
      </div>
      <nav className="mt-4">
        <Link 
          to="/guide" 
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
        >
          <BookOpen className="w-4 h-4" />
          <span>View Guide</span>
        </Link>
      </nav>
    </div>
  );
}