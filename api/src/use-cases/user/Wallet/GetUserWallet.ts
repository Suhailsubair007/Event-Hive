import { IWalletRepository } from "../../../entities/repositoryInterface/User/interface.WaleetRepository";
import { Wallet } from "../../../entities/modelInterface/Wallet";
import { Types } from "mongoose";

export class GetUserWallet {
  constructor(private walletRepository: IWalletRepository) {}

  async execute(userId: string): Promise<Wallet> {
    const userIdObjectId = new Types.ObjectId(userId);

    let wallet = await this.walletRepository.findWalletByUser(userIdObjectId);

    if (!wallet) {
      wallet = await this.walletRepository.createWallet({
        user: userIdObjectId,
        balance: 0,
        transactions: [],
      });
    }

    wallet.transactions.sort(
      (a, b) =>
        new Date(b.transaction_date).getTime() -
        new Date(a.transaction_date).getTime()
    );

    return wallet;
  }
}
