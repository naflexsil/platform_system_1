import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: false,
    },
    order: {
      type: Number,
      required: true,
    },
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: false,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Lesson", lessonSchema);
