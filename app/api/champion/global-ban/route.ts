import GlobalBan from "@/models/GlobalBan";
import { connectDB } from "@/lib/mongoose";
import Champion from "@/models/Champion";
import { GlobalBanChampion } from "@/types/champion";
import { NextResponse } from "next/server";
import { getToday } from "@/utils/server";

interface TodayBan {
  date: string;
  champions: {
    name: string;
    en_name: string;
    _id: string;
  }[];
}

export async function GET() {
  await connectDB();

  const today = getToday();
  console.log("today: ", today);

  try {
    let todayBan: TodayBan | null = (await GlobalBan.findOne({
      date: today,
    }).lean()) as TodayBan | null;

    if (todayBan) {
      const champions = todayBan.champions.map(
        ({ _id, ...champion }) => champion
      );
      return NextResponse.json(champions, { status: 200 });
    }

    const champions: GlobalBanChampion[] = await Champion.aggregate([
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

    return NextResponse.json(champions, { status: 200 });
  } catch (error: any) {
    console.error("챔피언을 불러오는 중 에러 발생: ", error);
    return NextResponse.json(
      { error: error.message || "서버 에러가 발생하였습니다." },
      { status: 500 }
    );
  }
}
