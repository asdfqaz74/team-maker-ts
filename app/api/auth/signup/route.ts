import { connectDB } from "@/lib/mongoose";
import Member from "@/models/Member";
import bcrypt from "bcryptjs";

const saltRounds = 10;

// 비밀번호는 최소 8자 이상, 문자와 숫자를 포함해야 합니다.
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  // mongoDB에 연결
  await connectDB();

  // 요청 본문을 JSON으로 파싱
  const body = await request.json();
  const { userId, password, name, email } = body;

  // 중복된 아이디가 있는지 확인
  const memberId = await Member.findOne({ userId });

  // 중복된 아이디가 있으면 409 Conflict 응답
  if (memberId) {
    return Response.json(
      { error: "이미 존재하는 아이디입니다." },
      { status: 409 }
    );
  }

  // 중복된 이메일이 있는지 확인
  const memberEmail = await Member.findOne({ email });

  // 중복된 이메일이 있으면 409 Conflict 응답
  if (memberEmail) {
    return Response.json(
      { error: "이미 존재하는 이메일입니다." },
      { status: 409 }
    );
  }

  // 이메일 형식이 유효한지 확인
  if (!emailRegex.test(email)) {
    return Response.json(
      { error: "유효한 이메일 주소를 입력하세요." },
      { status: 400 }
    );
  }

  // 비밀번호가 유효한지 확인
  if (!passwordRegex.test(password)) {
    return Response.json(
      { error: "비밀번호는 최소 8자 이상, 문자와 숫자를 포함해야 합니다." },
      { status: 400 }
    );
  }

  // 비밀번호 해싱
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // new Member 생성
  const newMember = await Member.create({
    userId,
    password: hashedPassword,
    name,
    email,
  });

  // newMember를 JSON으로 변환하여 응답
  return Response.json(
    { message: "회원가입 성공", member: newMember },
    { status: 201 }
  );
}
