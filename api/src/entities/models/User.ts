import mongoose, { Document, Schema } from "mongoose";

export interface Iuser extends Document {
  name: string;
  email: string;
  password: string;
  gender?: string;
  phone?: string; 
  profilePic?: string;
  role?: [string];
  isActive?: boolean;
  isPremiumUser?: boolean;
  timestamp?: Date;
}

const UserSchema = new Schema<Iuser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String },
  profilePic: { type: String },
  role: { type: [String], enum: ["admin", "user"], default: ["user"] },
  gender: { type: String },
  isActive: { type: Boolean, default: true },
  isPremiumUser: { type: Boolean, default: false },
  timestamp: { type: Date, default: Date.now },
});

export const UserModal = mongoose.model<Iuser>("User", UserSchema);
