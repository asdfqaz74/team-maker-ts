export default function getTokenFromHeader(headers: Headers) {
  const authHeader = headers.get("authorization");
  return authHeader?.split(" ")[1];
}
