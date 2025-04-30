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
