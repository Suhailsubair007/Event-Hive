import mongoose, { Schema } from "mongoose";
import { Iuser } from "../../entities/modelInterface/User";

const UserSchema = new Schema<Iuser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String },
  profilePic: { type: String },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  isActive: { type: Boolean, default: true },
  isPremiumUser: { type: Boolean, default: false },
  timestamp: { type: Date, default: Date.now },
});

export const UserModal = mongoose.model<Iuser>("User", UserSchema);
