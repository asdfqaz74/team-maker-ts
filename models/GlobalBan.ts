import { Schema, Document, models, model } from "mongoose";

// 타입 정의
export interface IGlobalBan extends Document {
  date: string;
  champions: { name: string; en_name: string }[];
}

// 스키마 정의
const GlobalBanSchema = new Schema<IGlobalBan>({
  date: { type: String, required: true },
  champions: [
    {
      name: { type: String, required: true },
      en_name: { type: String, required: true },
    },
  ],
});

// 모델 export
const GlobalBan =
  models.GlobalBan || model<IGlobalBan>("GlobalBan", GlobalBanSchema);

export default GlobalBan;
