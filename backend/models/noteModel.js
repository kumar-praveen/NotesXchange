import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    fileUrl: {
      type: String,
      required: true,
    },
    filePublicId: {
      type: String,
    },
    localFileName: {
      type: String,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Note = mongoose.model("Note", noteSchema);
