import mongoose, { Document, Schema } from "mongoose";

export interface EnrollmentDocument extends Document {
  student: mongoose.Types.ObjectId;
  course: mongoose.Types.ObjectId;
  completedLessons: mongoose.Types.ObjectId[];
}

const EnrollmentSchema = new Schema<EnrollmentDocument>(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    completedLessons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }],
  },
  { timestamps: true },
);

EnrollmentSchema.index({ student: 1, course: 1 }, { unique: true });

export const Enrollment = mongoose.model<EnrollmentDocument>(
  "Enrollment",
  EnrollmentSchema,
);
