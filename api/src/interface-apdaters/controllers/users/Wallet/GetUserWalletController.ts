import { Request, Response } from "express";
import { GetUserWallet } from "../../../../use-cases/user/Wallet/GetUserWallet";

export class GetUserWalletController {
  constructor(private getUserWalletController: GetUserWallet) {}

  async getUserWallet(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.query;

      const wallet = await this.getUserWalletController.execute(userId as string);
      res.status(200).json({
        success: true,
        message: "Wallet fetched successfully",
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