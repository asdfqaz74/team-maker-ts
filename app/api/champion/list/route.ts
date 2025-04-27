import { connectDB } from "@/lib/mongoose";
import Champion from "@/models/Champion";
import { ChampionList, MongoChampion } from "@/types/champion";

export async function GET() {
  await connectDB();

  try {
    const list: MongoChampion[] = await Champion.find(
      {},
      { name: 1, en_name: 1 }
    ).sort({
      name: 1,
    });

    const champions: ChampionList[] = list.map((champion) => {
      return {
        id: champion._id,
        name: champion.name,
        en_name: champion.en_name,
        image: `/images/champions/portrait/${champion.en_name}.webp`,
      };
    });

    return Response.json(champions, { status: 200 });
  } catch (error: any) {
    console.error("챔피언을 불러오는 중 에러 발생: ", error);
    return Response.json(
      { error: error.message || "서버 에러가 발생하였습니다." },
      { status: 500 }
    );
  }
}
