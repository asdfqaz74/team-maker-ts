import { NEXTAUTH_SECRET } from "@/constants";
import { connectDB } from "@/lib/mongoose";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export async function checkToken(request: NextRequest): Promise<string | null> {
  await connectDB();

  const token = await getToken({ req: request, secret: NEXTAUTH_SECRET });

  if (!token || !token.userId) {
    return null;
  }

  const userId = token.userId as string;

  return userId;
}
