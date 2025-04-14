import { connectDB } from "@/lib/mongoose";
import Match from "@/models/Match";

export async function GET() {
  await connectDB();

  try {
    const result = await Match.aggregate([
      { $unwind: "$players" },
      {
        $group: {
          _id: "$players.champion",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "champions",
          localField: "_id",
          foreignField: "en_name",
          as: "championInfo",
        },
      },
      {
        $project: {
          _id: 0,
          en_name: "$_id",
          name: { $arrayElemAt: ["$championInfo.name", 0] },
          image: {
            $concat: ["/images/champions/loading/", "$_id", ".jpg"],
          },
          logo: {
            $concat: ["/images/champions/centered/", "$_id", ".jpg"],
          },
          count: 1,
        },
      },
    ]);

    return Response.json(result, { status: 200 });
  } catch (error) {
    console.error("챔피언을 불러오는 중 에러 발생: ", error);
    return Response.json(
      { error: error.message || "서버 에러가 발생하였습니다." },
      { status: 500 }
    );
  }
}
