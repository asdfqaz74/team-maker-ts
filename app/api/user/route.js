import { connectDB } from "@/lib/mongoose";
import User from "@/models/User";

// 유저 정보를 가져오는 API
export async function GET() {
  await connectDB();

  const users = await User.find().select("-__v");
  return Response.json(users);
}

// 유저 정보를 생성하는 API
// 유저 정보 생성할 때는 name, nickName 이 필수값입니다.
export async function POST(request) {
  await connectDB();
  const body = await request.json();
  const user = await User.create(body);
  return Response.json(user, { status: 201 });
}
