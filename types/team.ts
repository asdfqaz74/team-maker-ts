import { IElo } from "@/models/User";

interface GroupName {
  _id: string;
  name: string;
}

export interface TeamResponse {
  _id: string;
  name: string;
  nickName: string;
  position: "top" | "jug" | "mid" | "adc" | "sup";
  winRate: string | number;
  group: GroupName[];
  eloRating: IElo;
}
