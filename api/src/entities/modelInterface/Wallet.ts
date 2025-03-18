import { Types } from "mongoose";

export interface Transaction {
  booking_id?: Types.ObjectId;
  transaction_date: Date;
  transaction_type: "debit" | "credit";
  transaction_status: "pending" | "completed" | "failed";
  amount: number;
}

export interface Wallet {
  user: Types.ObjectId;
  balance: number;
  transactions: Transaction[];
}