import { Schema, Document, models, model } from "mongoose";
import Member from "./Member";

// 타입 정의
export interface IGroup extends Document {
  name: string;
  createdBy: Schema.Types.ObjectId;
}

// 스키마 정의
const GroupSchema = new Schema<IGroup>(
  {
    name: { type: String, required: true },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "Member",
      required: true,
    },
  },
  { timestamps: true }
);

// 모델 export
const Group = models.Group || model<IGroup>("Group", GroupSchema);

export default Group;
