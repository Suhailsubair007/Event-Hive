import mongoose, { Schema, Document } from "mongoose";
import { ISubscription } from "../../entities/modelInterface/Subscription";

interface SubscriptionDocument extends Omit<ISubscription, "_id">, Document {}

const SubscriptionSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    posterImage: { type: String },
    amount: { type: Number, required: true },
    billingCycle: { type: String, enum: ["monthly", "yearly"], required: true },
    maxEvents: { type: Number, required: true },
    duration: { type: Number, required: true },
    expiresIn: { type: Date, required: true },
  },
  { timestamps: true }
);

export const SubscriptionModel = mongoose.model<SubscriptionDocument>(
  "Subscription",
  SubscriptionSchema
);
