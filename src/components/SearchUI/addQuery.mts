type Params = Record<string, string | number | boolean>;

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const paramsObject = Object.fromEntries(urlParams.entries());

export function addQuery(baseUrl: string, params: Params): string {
  const url = new URL(baseUrl, window.location.origin);

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, String(value));
  });

  return url.toString();
}

export function addAutoQuery(baseUrl: string) {
  return addQuery(baseUrl, paramsObject)
}