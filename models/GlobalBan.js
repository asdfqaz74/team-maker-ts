import mongoose from "mongoose";

const globalBanSchema = new mongoose.Schema({
  date: { type: String, required: true, unique: true },
  champions: [{ name: String, en_name: String }],
});

export default mongoose.models.GlobalBan ||
  mongoose.model("GlobalBan", globalBanSchema);
