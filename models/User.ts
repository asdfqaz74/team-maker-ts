import { Schema, Document, models, model } from "mongoose";
import Group from "./Group";

// 타입 정의
// Elo 타입
export interface IElo {
  top: number;
  jug: number;
  mid: number;
  adc: number;
  sup: number;
}

export type PositionType = keyof IElo;

// 사용자 타입
export interface IUser extends Document {
  name: string;
  nickName: string;
  position: PositionType;
  mainCharacter: string;
  eloRating: IElo;
  totalGames: number;
  wins: number;
  losses: number;
  monthlyTotalGames: number;
  monthlyWins: number;
  monthlyLosses: number;
  group: Schema.Types.ObjectId[];
  createdBy: Schema.Types.ObjectId;
  lastMonthlyReset: Date;
  winStreak: number;
}

// 스키마 정의
// Elo 스키마
const EloSchema = new Schema<IElo>(
  {
    top: { type: Number, default: 1000 },
    jug: { type: Number, default: 1000 },
    mid: { type: Number, default: 1000 },
    adc: { type: Number, default: 1000 },
    sup: { type: Number, default: 1000 },
  },
  { _id: false }
);

// User 스키마
const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  nickName: { type: String, required: true },
  position: {
    type: String,
    enum: ["top", "jug", "mid", "adc", "sup"],
    default: "top",
  },
  mainCharacter: { type: String },
  eloRating: { type: EloSchema, default: () => ({}) },
  totalGames: { type: Number, default: 0 },
  wins: { type: Number, default: 0 },
  losses: { type: Number, default: 0 },
  monthlyTotalGames: { type: Number, default: 0 },
  monthlyWins: { type: Number, default: 0 },
  monthlyLosses: { type: Number, default: 0 },
  group: [{ type: Schema.Types.ObjectId, ref: "Group" }],
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "Member",
    required: true,
  },
  lastMonthlyReset: { type: Date, default: () => new Date() },
  winStreak: { type: Number, default: 0 },
});

// 모듈 export
const User = models.User || model<IUser>("User", UserSchema);

export default User;
