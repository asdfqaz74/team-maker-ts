import { JWT_EXPIRES_IN, SECRET } from "@/constants";
import Member from "@/models/Member";
import {
  ExceptPasswordMember,
  ExceptPasswordMemberDocument,
} from "@/types/member";
import { checkToken } from "@/utils/server";
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

// 사용자 정보 조회
export async function GET(request: NextRequest) {
  const userId = await checkToken(request);

  if (!userId) {
    return Response.json({ error: "로그인 후 사용해주세요." }, { status: 401 });
  }

  try {
    const member = await Member.findOne({
      userId: userId,
    })
      .select("-password -_id")
      .lean<ExceptPasswordMember>();

    if (!member) {
      return Response.json(
        { error: "사용자를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

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
export async function PATCH(request: NextRequest) {
  const userId = await checkToken(request);

  if (!userId) {
    return Response.json({ error: "로그인 후 사용해주세요." }, { status: 401 });
  }

  try {
    const member = await Member.findOne<ExceptPasswordMemberDocument>({
      userId: userId,
    }).select("-password");

    if (!member) {
      return Response.json(
        { error: "사용자를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    const { changeId } = await request.json();

    // 아이디 중복 체크
    const existingUser = await Member.findOne({ changeId });

    if (existingUser) {
      return Response.json(
        { error: "이미 사용중인 아이디입니다." },
        { status: 409 }
      );
    }

    member.userId = changeId;
    await member.save();

    // 토큰 재발급
    const newToken = jwt.sign(
      {
        userId: member.userId,
        email: member.email,
        name: member.name,
      },
      SECRET,
      { expiresIn: JWT_EXPIRES_IN }
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
