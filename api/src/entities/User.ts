import mongoose, { Document, Schema } from "mongoose";

export interface Iuser extends Document {
  email: string;
  password: string;
}

const UserSchema = new Schema<Iuser>({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export const UserModal = mongoose.model<Iuser>("User", UserSchema);
