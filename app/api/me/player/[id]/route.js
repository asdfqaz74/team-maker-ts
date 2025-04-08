import { connectDB } from "@/lib/mongoose";
import User from "@/models/User";

export async function PATCH(request, { params }) {
  await connectDB();

  const authHeader = request.headers.get("authorization");
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return Response.json({ error: "토큰이 없습니다." }, { status: 401 });
  }

  const body = await request.json();
  const { nickName, position, eloRating } = body;
  const { id } = await params;

  try {
    const updated = await User.findByIdAndUpdate(
      id,
      {
        nickName,
        position,
        eloRating,
      },
      { new: true }
    );

    return Response.json({ message: "수정 완료", updated }, { status: 200 });
  } catch (error) {
    console.error("사용자 수정 중 오류: ", error);
    return Response.json(
      { error: "사용자 수정 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
