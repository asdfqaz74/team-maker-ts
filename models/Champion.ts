import { Schema, Document, models, model } from "mongoose";

// 타입 정의
export interface IChampion extends Document {
  name: string;
  title: string;
  image: string;
  small: string;
  loading: string;
  en_name: string;
}

// 스키마 정의
const ChampionSchema = new Schema<IChampion>({
  name: { type: String, required: true },
  title: { type: String, required: true },
  image: { type: String, required: true },
  small: { type: String, required: true },
  loading: { type: String, required: true },
  en_name: { type: String, required: true },
});

// 모델 export
const Champion =
  models.Champion || model<IChampion>("Champion", ChampionSchema);

export default Champion;
