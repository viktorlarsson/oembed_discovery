export interface RawHtmlRendererProps {
  html: string;
  className?: string;
  onLoad?: () => void;
  onError?: (error: string) => void;
}