import { IPlayerStats } from "@/models/Match";

type User = {
  _id: string;
  nickName: string;
};

export type UserList = User[];

type Bans = {
  id: string;
  image: string;
  name: string;
};

export type BansList = Bans[];

export interface Parsed {
  players: IPlayerStats[];
  maxDamage: number;
}
