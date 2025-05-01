import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    lesson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson",
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
      maxlength: 255,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Comment", commentSchema);
