import { Request, Response } from "express";
import { AddAmountToWallet } from "../../../../use-cases/user/Wallet/AddAmountToWallet";

export class AddAmountToWalletController {
  constructor(private addAmountToWalletController: AddAmountToWallet) {}

  async addAmountToWallet(req: Request, res: Response): Promise<void> {
    try {
      const { userId, amount } = req.body;

      const wallet = await this.addAmountToWalletController.execute(userId, amount);
      res.status(200).json({
        success: true,
        message: "Wallet updated successfully",
        wallet,
      });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message,
      });
    }
  }
}