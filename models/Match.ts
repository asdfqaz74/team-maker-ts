import { Schema, Document, models, model, Types } from "mongoose";

// 타입 정의
// 선수 타입
export interface IPlayerStats extends Document {
  userNickname?: string;
  champion: string;
  team: "Blue" | "Red";
  position: string;
  kills: number;
  deaths: number;
  assists: number;
  totalDamageDealt: number;
  totalDamageTaken: number;
  boughtWards: number;
  wardsPlaced: number;
  wardsKilled: number;
  minionsKilled: number;
  win: boolean;
}

// 매치 타입
export interface IMatch extends Document {
  players: Types.DocumentArray<IPlayerStats>;
  uploadedBy: Schema.Types.ObjectId;
  maxDamage: number;
  banChampion: Schema.Types.ObjectId[];
}

// 스키마 정의
// 선수 스키마
const PlayerSchema = new Schema<IPlayerStats>(
  {
    userNickname: { type: String, required: false },
    champion: { type: String, required: true },
    team: { type: String, enum: ["Blue", "Red"], required: true },
    position: { type: String, required: true },
    kills: { type: Number, required: true },
    deaths: { type: Number, required: true },
    assists: { type: Number, required: true },
    totalDamageDealt: { type: Number, required: true },
    totalDamageTaken: { type: Number, required: true },
    boughtWards: { type: Number, required: true },
    wardsPlaced: { type: Number, required: true },
    wardsKilled: { type: Number, required: true },
    minionsKilled: { type: Number, required: true },
    win: { type: Boolean, required: true },
  },
  { _id: false }
);

// 매치 스키마
const MatchSchema = new Schema<IMatch>(
  {
    players: [PlayerSchema],
    uploadedBy: {
      type: Schema.Types.ObjectId,
      ref: "Member",
      required: true,
    },
    maxDamage: Number,
    banChampion: [
      {
        type: Schema.Types.ObjectId,
        ref: "Champion",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

// 모델 export
const Match = models.Match || model<IMatch>("Match", MatchSchema);

export default Match;
