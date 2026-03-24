export function sendJSONResponse(res, statusCode, data) {
  res.statusCode = statusCode;
  res.end(JSON.stringify(data));
}
