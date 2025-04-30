import { connectDB } from "@/lib/mongoose";
import Member from "@/models/Member";

export async function POST(request: Request) {
  await connectDB();

  const { oldId, newId } = await request.json();
  await Member.updateOne({ userId: oldId }, { $set: { userId: newId } })
    .then(() => {
      return Response.json(
        { message: "ID가 성공적으로 변경되었습니다." },
        { status: 200 }
      );
    })
    .catch((error) => {
      console.error("ID 변경 중 오류: ", error);
      return Response.json(
        { error: "ID 변경 중 오류가 발생했습니다." },
        { status: 400 }
      );
    });
}
