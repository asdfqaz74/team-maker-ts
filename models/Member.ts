import { Schema, Document, models, model } from "mongoose";

// 타입 정의
export interface IMember extends Document {
  userId: string;
  password: string;
  name: string;
  email: string;
}

// 스키마 정의
const MemberSchema = new Schema<IMember>(
  {
    userId: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

// 모델 export
const Member = models.Member || model<IMember>("Member", MemberSchema);
