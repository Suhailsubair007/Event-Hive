import { IWalletRepository } from "../../../entities/repositoryInterface/User/interface.WaleetRepository";
import { Transaction, Wallet } from "../../../entities/modelInterface/Wallet";
import { Types } from "mongoose";

export class AddAmountToWallet {
  constructor(private walletRepository: IWalletRepository) {}

  async execute(userId: string, amount: number): Promise<Wallet> {
    const userIdObjectId = new Types.ObjectId(userId);

    let wallet = await this.walletRepository.findWalletByUser(userIdObjectId);
    
    if (!wallet) {
      wallet = await this.walletRepository.createWallet({
        user: userIdObjectId,
        balance: 0,
        transactions: [],
      });
    }

    const transaction: Transaction = {
      transaction_date: new Date(),
      transaction_type: "credit",
      transaction_status: "completed",
      amount: amount,
    };

    return this.walletRepository.updateWalletBalance(userIdObjectId, amount, transaction);
  }
}