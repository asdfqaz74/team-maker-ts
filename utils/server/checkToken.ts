import { connectDB } from "@/lib/mongoose";
import { getTokenFromHeader } from "./getTokenFromHeader";

export async function checkToken(
  headers: Headers
): Promise<{ ok: true; token: string } | { ok: false; response: Response }> {
  await connectDB();

  const token = getTokenFromHeader(headers);

  if (!token) {
    return {
      ok: false,
      response: Response.json({ error: "토큰이 없습니다." }, { status: 401 }),
    };
  }

  return { ok: true, token };
}
