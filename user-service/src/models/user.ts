import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  login: string;
  password: string;
  role: "student" | "teacher";
  favorites: mongoose.Types.ObjectId[];
}

const UserSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  login: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["student", "teacher"], required: true },
  favorites: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Course", default: [] },
  ],
});

export default mongoose.model<IUser>("User", UserSchema);
