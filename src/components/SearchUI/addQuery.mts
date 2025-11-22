type Params = Record<string, string | number | boolean>;

export function addQuery(baseUrl: string, params: Params): string {
  const url = new URL(baseUrl, window.location.origin);

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, String(value));
  });

  return url.toString();
}