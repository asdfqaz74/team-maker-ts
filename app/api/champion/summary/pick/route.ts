import { connectDB } from "@/lib/mongoose";
import Match from "@/models/Match";
import { PickChampion } from "@/types/champion";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  try {
    const result: PickChampion[] = await Match.aggregate([
      { $unwind: "$players" },
      {
        $group: {
          _id: "$players.champion",
          count: { $sum: 1 },
          winCount: {
            $sum: { $cond: [{ $eq: ["$players.win", true] }, 1, 0] },
          },
        },
      },
      { $addFields: { winRate: { $divide: ["$winCount", "$count"] } } },
      { $sort: { winRate: -1, count: -1 } },
      { $limit: 3 },
      {
        $lookup: {
          from: "champions",
          localField: "_id",
          foreignField: "en_name",
          as: "bestPick",
        },
      },
      {
        $project: {
          _id: 0,
          en_name: "$_id",
          name: { $arrayElemAt: ["$bestPick.name", 0] },
          image: {
            $concat: ["/images/champions/portrait/", "$_id", ".webp"],
          },
          count: 1,
          winRate: {
            $round: [
              { $multiply: [{ $divide: ["$winCount", "$count"] }, 100] },
            ],
          },
        },
      },
    ]);

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error("챔피언을 불러오는 중 에러 발생: ", error);
    return NextResponse.json(
      { error: error.message || "서버 에러가 발생하였습니다." },
      { status: 500 }
    );
  }
}
