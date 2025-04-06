import mongoose from "mongoose";

const ChampionSchema = new mongoose.Schema({
  name: String,
  title: String,
  image: String,
  small: String,
  en_name: String,
});

export default mongoose.models.Champion ||
  mongoose.model("Champion", ChampionSchema);
