import mongoose from "mongoose";

const GroupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

const Group = mongoose.models.Group || mongoose.model("Group", GroupSchema);
