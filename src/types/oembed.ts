export interface OEmbedResponse {
  type: 'photo' | 'video' | 'link' | 'rich';
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
}