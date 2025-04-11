import { connectDB } from "@/lib/mongoose";
import { findMember } from "@/utils/findMember";
import getTokenFromHeader from "@/utils/getTokenFromHeader";
import { verifyToken } from "@/utils/verifyToken";

export async function POST(request) {
  await connectDB();

  const token = getTokenFromHeader(request.headers);

  if (!token) {
    return Response.json({ error: "토큰이 없습니다." }, { status: 401 });
  }

  try {
    const decoded = verifyToken(token);
    const userId = decoded.userId;
    const member = await findMember({ userId });

    const body = await request.json();
    const { p}
  } catch (error) {}
}
