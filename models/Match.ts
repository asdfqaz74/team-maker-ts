import mongoose from "mongoose";
import Member from "./Member";

const PlayerStatsSchema = new mongoose.Schema({
  userNickname: String,
  champion: String,
  team: { type: String, enum: ["Blue", "Red"] },
  position: String,
  kills: Number,
  deaths: Number,
  assists: Number,
  totalDamageDealt: Number,
  totalDamageTaken: Number,
  boughtWards: Number,
  wardsPlaced: Number,
  wardsKilled: Number,
  minionsKilled: Number,
  win: Boolean,
});

const MatchSchema = new mongoose.Schema(
  {
    players: [PlayerStatsSchema],
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      required: true,
    },
    maxDamage: Number,
    banChampion: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Champion",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Match || mongoose.model("Match", MatchSchema);
