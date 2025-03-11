import mongoose, { Schema, Document } from "mongoose";
import { UserSubscription } from "../../entities/modelInterface/UserSubscription";

interface UserSubscriptionDocument extends UserSubscription, Document {}

const userSubscriptionSchema: Schema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    planId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubscriptionPlan",
      required: true,
    },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, required: true },
    isActive: { type: Boolean, default: true },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model<UserSubscriptionDocument>(
  "UserSubscription",
  userSubscriptionSchema
);
