export default function getTokenFromHeader(headers) {
  const authHeader = headers.get("authorization");
  return authHeader?.split(" ")[1];
}
