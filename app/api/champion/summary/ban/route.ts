import Match from "@/models/Match";
import { connectDB } from "@/lib/mongoose";
import { BanChampion } from "@/types/champion";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  try {
    const result: BanChampion[] = await Match.aggregate([
      { $unwind: "$banChampion" },
      {
        $group: {
          _id: "$banChampion",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 3 },
      {
        $lookup: {
          from: "champions",
          localField: "_id",
          foreignField: "_id",
          as: "MostBan",
        },
      },
      {
        $project: {
          _id: 0,
          id: "$_id",
          name: { $arrayElemAt: ["$MostBan.name", 0] },
          en_name: { $arrayElemAt: ["$MostBan.en_name", 0] },
          image: {
            $concat: [
              "/images/champions/portrait/",
              { $arrayElemAt: ["$MostBan.en_name", 0] },
              ".webp",
            ],
          },
          count: 1,
        },
      },
    ]);

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error("밴 챔피언 통계 오류:", error);
    return NextResponse.json(
      { error: error.message || "밴 챔피언 집계 실패" },
      { status: 500 }
    );
  }
}
