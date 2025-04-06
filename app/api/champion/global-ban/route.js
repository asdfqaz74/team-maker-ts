import { connectDB } from "@/lib/mongoose";
import Champion from "@/models/Champion";

export async function GET() {
  await connectDB();
  try {
    const champions = await Champion.aggregate([
      { $sample: { size: 5 } },
      {
        $project: {
          _id: 0,
          __v: 0,
          en_name: 0,
          title: 0,
        },
      },
    ]);
    return Response.json(champions, { status: 200 });
  } catch (error) {
    console.error("챔피언을 불러오는 중 에러 발생: ", error);
    return Response.json(
      { error: error.message || "서버 에러가 발생하였습니다." },
      { status: 500 }
    );
  }
}
