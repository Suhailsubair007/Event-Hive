import { Wallet, Transaction } from "../../../entities/modelInterface/Wallet";
import { Types } from "mongoose";

export interface IWalletRepository {
  findWalletByUser(userId: Types.ObjectId): Promise<Wallet | null>;
  createWallet(wallet: Wallet): Promise<Wallet>;
  updateWalletBalance(userId: Types.ObjectId, amount: number, transaction: Transaction): Promise<Wallet>;
}