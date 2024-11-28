export interface OEmbedResponse {
    type: 'photo' | 'video' | 'link' | 'rich' | 'audio';
    version?: string;
    title?: string;
    author_name?: string;
    author_url?: string;
    provider_name?: string;
    provider_url?: string;
    cache_age?: number;
    thumbnail_url?: string;
    thumbnail_width?: number;
    thumbnail_height?: number;
    url?: string;
    html?: string;
    width?: number;
    height?: number;
    // Additional fields for audio/video
    duration?: number;
    description?: string;
    is_plus?: string;
    account_type?: string;
    // Schema.org specific fields
    embedUrl?: string;
    contentUrl?: string;
    // Open Graph specific
    og_type?: string;
    og_url?: string;
  }