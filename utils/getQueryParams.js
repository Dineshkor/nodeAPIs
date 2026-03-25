export function getQueryParams(req) {
  const urlObj = new URL(req.url, `http://${req.headers.host}`)
  const queryParams = Object.fromEntries(urlObj.searchParams.entries())
  return Object.keys(queryParams).length > 0 ? queryParams : null
}