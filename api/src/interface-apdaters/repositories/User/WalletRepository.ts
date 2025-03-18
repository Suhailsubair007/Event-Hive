import { IWalletRepository } from "../../../entities/repositoryInterface/User/interface.WaleetRepository";
import { Wallet, Transaction } from "../../../entities/modelInterface/Wallet";
import { WalletModel } from "../../../frameworks/databaseModels/WalletModel";
import { CustomError } from "../../../shared/utils/CustomError";
import { Types } from "mongoose";

export class WalletRepository implements IWalletRepository {
  async findWalletByUser(userId: Types.ObjectId): Promise<Wallet | null> {
    return WalletModel.findOne({ user: userId });
  }

  async createWallet(wallet: Wallet): Promise<Wallet> {
    const newWallet = new WalletModel(wallet);
    await newWallet.save();
    return newWallet;
  }

  async updateWalletBalance(
    userId: Types.ObjectId,
    amount: number,
    transaction: Transaction
  ): Promise<Wallet> {
    const wallet = await WalletModel.findOne({ user: userId });
    if (!wallet) {
      throw new CustomError("Wallet not found", 404);
    }

    wallet.balance += amount;
    wallet.transactions.push(transaction);
    await wallet.save();
    return wallet;
  }
}
