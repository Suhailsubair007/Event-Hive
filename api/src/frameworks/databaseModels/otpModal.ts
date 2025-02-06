import mongoose, { Schema } from "mongoose";
import {  IOTP} from "../../entities/modelInterface/otp.interface";
import { sendVerificationEmail } from "../../shared/utils/mail.sender";

const OTPSchema: Schema = new Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 60 * 2 },
});

OTPSchema.pre<IOTP>("save", async function (next) {
  if (this.isNew) {
    await sendVerificationEmail(this.email, this.otp);
  }
  next();
});

export const OTP = mongoose.model<IOTP>("OTP", OTPSchema);
