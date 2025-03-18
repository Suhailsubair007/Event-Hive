import { Schema, model, Document, Types } from "mongoose";
import { Wallet, Transaction } from "../../entities/modelInterface/Wallet";

const TransactionSchema = new Schema<Transaction>({
  booking_id: { type: Schema.Types.ObjectId, ref: "Booking" },
  transaction_date: { type: Date, required: true },
  transaction_type: { type: String, enum: ["debit", "credit"], required: true },
  transaction_status: {
    type: String,
    enum: ["pending", "completed", "failed"],
    required: true,
  },
  amount: { type: Number, required: true },
});

const WalletSchema = new Schema<Wallet & Document>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    balance: { type: Number, required: true, default: 0 },
    transactions: { type: [TransactionSchema], default: [] },
  },
  { timestamps: true }
);

export const WalletModel = model<Wallet & Document>("Wallet", WalletSchema);