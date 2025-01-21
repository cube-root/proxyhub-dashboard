export const HTTP_METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'];

export const CONTENT_TYPES = {
  'application/json': 'JSON',
  'application/x-www-form-urlencoded': 'Form URL Encoded',
  'multipart/form-data': 'Form Data',
  'text/plain': 'Plain Text',
  'application/xml': 'XML'
} as const;

export function parseUrl(url: string): { baseUrl: string; queryParams: { key: string; value: string }[] } {
  try {
    const urlObj = new URL(url);
    const queryParams: { key: string; value: string }[] = [];
    
    urlObj.searchParams.forEach((value, key) => {
      queryParams.push({ key, value });
    });

    return {
      baseUrl: `${urlObj.origin}${urlObj.pathname}`,
      queryParams,
    };
  } catch {
    return {
      baseUrl: url,
      queryParams: [],
    };
  }
}

export function buildUrl(baseUrl: string, queryParams: { key: string; value: string }[]): string {
  const url = new URL(baseUrl);
  queryParams.forEach(({ key, value }) => {
    if (key && value) {
      url.searchParams.append(key, value);
    }
  });
  return url.toString();
}

export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
} 