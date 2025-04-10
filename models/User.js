import mongoose from "mongoose";
import Group from "./Group";

const EloSchema = new mongoose.Schema(
  {
    top: { type: Number, default: 1000 },
    jug: { type: Number, default: 1000 },
    mid: { type: Number, default: 1000 },
    adc: { type: Number, default: 1000 },
    sup: { type: Number, default: 1000 },
  },
  { _id: false }
);

const UserSchema = new mongoose.Schema({
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
  group: [{ type: mongoose.Schema.Types.ObjectId, ref: "Group" }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
    required: true,
  },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
