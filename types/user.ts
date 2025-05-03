import { IGroup } from "@/models/Group";
import { IElo, PositionType } from "@/models/User";
import { Document, Types } from "mongoose";

export interface User {
  name: string;
  nickName: string;
  position: PositionType;
  group: Types.ObjectId | IGroup | null;
  eloRating: IElo;
}

export type UserDocument = Document<unknown, {}, User> & User;

export interface Player {
  _id: string;
  name: string;
  nickName: string;
  position: "top" | "jungle" | "mid" | "adc" | "sup";
  group?: Array<{ name: string } | string> | null;
  eloRating: IElo;
}
