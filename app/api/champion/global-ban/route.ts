import GlobalBan from "@/models/GlobalBan";
import { connectDB } from "@/lib/mongoose";
import Champion from "@/models/Champion";
import getToday from "@/utils/getToday";

export async function GET() {
  await connectDB();

  const today = getToday();

  try {
    let todayBan = await GlobalBan.findOne({ date: today });

    if (todayBan) {
      return Response.json(todayBan.champions, { status: 200 });
    }

    const champions = await Champion.aggregate([
      { $sample: { size: 5 } },
      {
        $project: {
          name: 1,
          en_name: 1,
          _id: 0,
        },
      },
    ]);

    await GlobalBan.create({ date: today, champions });

    return Response.json(champions, { status: 200 });
  } catch (error) {
    console.error("챔피언을 불러오는 중 에러 발생: ", error);
    return Response.json(
      { error: error.message || "서버 에러가 발생하였습니다." },
      { status: 500 }
    );
  }
}
