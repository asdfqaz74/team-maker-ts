import { connectDB } from "@/lib/mongoose";
import Member from "@/models/Member";
import {
  ExceptPasswordMember,
  ExceptPasswordMemberDocument,
} from "@/types/member";
import getTokenFromHeader from "@/utils/getTokenFromHeader";
import { verifyToken } from "@/utils/verifyToken";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;

// 사용자 정보 조회
export async function GET(request: Request) {
  await connectDB();

  const token = getTokenFromHeader(request.headers);

  if (!token) {
    return Response.json({ error: "토큰이 없습니다." }, { status: 401 });
  }

  try {
    const decoded = verifyToken(token);
    const member = await Member.findOne({
      userId: decoded.userId,
    })
      .select("-password -_id")
      .lean<ExceptPasswordMember>();

    if (!member) {
      return Response.json(
        { error: "사용자를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    console.log("member", member);

    return Response.json({ user: member }, { status: 200 });
  } catch (error) {
    console.error("토큰 검증 중 오류: ", error);
    return Response.json(
      { error: "토큰 검증 중 오류가 발생했습니다." },
      { status: 401 }
    );
  }
}

// 아이디 수정
export async function PATCH(request: Request) {
  await connectDB();

  const token = getTokenFromHeader(request.headers);

  if (!token) {
    return Response.json({ error: "토큰이 없습니다." }, { status: 401 });
  }

  try {
    const decoded = verifyToken(token);
    const member = await Member.findOne<ExceptPasswordMemberDocument>({
      userId: decoded.userId,
    }).select("-password -_id");

    if (!member) {
      return Response.json(
        { error: "사용자를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    const { userId } = await request.json();

    // 아이디 중복 체크
    const existingUser = await Member.findOne({ userId });

    if (existingUser) {
      return Response.json(
        { error: "이미 사용중인 아이디입니다." },
        { status: 409 }
      );
    }

    member.userId = userId;
    await member.save();

    // 토큰 재발급
    const newToken = jwt.sign(
      {
        userId: member.userId,
        email: member.email,
        name: member.name,
      },
      SECRET,
      { expiresIn: "7d" }
    );

    return Response.json(
      { message: "아이디가 수정되었습니다.", token: newToken },
      { status: 200 }
    );
  } catch (error) {
    console.error("토큰 검증 중 오류: ", error);
    return Response.json(
      { error: "토큰 검증 중 오류가 발생했습니다." },
      { status: 401 }
    );
  }
}
