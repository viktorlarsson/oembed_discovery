const ALLOWED_TAGS = [
    'iframe',
    'script',
    'div',
    'a',
    'p',
    'span',
    'img',
    'video',
    'audio',
    'source',
    'blockquote'
  ];
  
  const ALLOWED_ATTRIBUTES = [
    'src',
    'href',
    'allowfullscreen',
    'frameborder',
    'width',
    'height',
    'class',
    'style',
    'id',
    'title',
    'alt',
    'controls',
    'autoplay',
    'loop',
    'muted',
    'playsinline'
  ];
  
  const ALLOWED_PROTOCOLS = [
    'http:',
    'https:',
    'mailto:',
    'tel:'
  ];
  
  export function sanitizeHtml(html: string): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    function sanitizeNode(node: Element): void {
      // Remove disallowed tags
      if (!ALLOWED_TAGS.includes(node.tagName.toLowerCase())) {
        node.remove();
        return;
      }
  
      // Remove disallowed attributes
      Array.from(node.attributes).forEach(attr => {
        if (!ALLOWED_ATTRIBUTES.includes(attr.name.toLowerCase())) {
          node.removeAttribute(attr.name);
        }
      });
  
      // Sanitize URLs
      ['src', 'href'].forEach(attr => {
        if (node.hasAttribute(attr)) {
          const url = node.getAttribute(attr);
          if (url) {
            try {
              const parsed = new URL(url);
              if (!ALLOWED_PROTOCOLS.includes(parsed.protocol)) {
                node.removeAttribute(attr);
              }
            } catch {
              node.removeAttribute(attr);
            }
          }
        }
      });
  
      // Recursively sanitize children
      Array.from(node.children).forEach(child => sanitizeNode(child));
    }
  
    Array.from(doc.body.children).forEach(node => {
      if (node instanceof Element) {
        sanitizeNode(node);
      }
    });
  
    return doc.body.innerHTML;
  }