export function matchUrlScheme(url: string, scheme: string): boolean {
  const schemeRegex = scheme
    .replace(/\*/g, '.*')
    .replace(/\//g, '\\/');
  return new RegExp(`^${schemeRegex}$`).test(url);
}

export function findProviderEndpoint(url: string, providers: any[]): string | null {
  for (const provider of providers) {
    for (const endpoint of provider.endpoints) {
      for (const scheme of endpoint.schemes) {
        if (matchUrlScheme(url, scheme)) {
          return endpoint.url;
        }
      }
    }
  }
  return null;
}