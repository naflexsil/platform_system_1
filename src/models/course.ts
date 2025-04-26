import slugify from "slugify";
import mongoose, { Schema, Document } from "mongoose";
import { CourseLevel } from "../models/types";

export interface ICourse extends Document {
  title: string;
  slug: string;
  description?: string;
  price: number;
  image: string;
  category: string;
  level: CourseLevel;
  published: boolean;
  author: mongoose.Types.ObjectId;
  createdAt: Date;
  tags: string[];
}

const CourseSchema: Schema<ICourse> = new Schema<ICourse>({
  title: { type: String, required: true },
  slug: { type: String, unique: true },
  description: { type: String },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  level: {
    type: String,
    enum: ["beginner", "intermediate", "advanced"],
    default: "beginner",
    required: true,
  },
  published: { type: Boolean, default: false },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
  tags: [{ type: String }],
});

CourseSchema.pre<ICourse>("save", function (next) {
  if (!this.slug) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

export default mongoose.model<ICourse>("Course", CourseSchema);
