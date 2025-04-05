import mongoose from "mongoose";

const MemberSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

export default mongoose.models.Member || mongoose.model("Member", MemberSchema);
