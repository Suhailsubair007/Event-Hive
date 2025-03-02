import { Request, Response } from "express";
import { UpdateUserPremiumStatus } from "../../../../use-cases/user/Auth/UpdateUserPremiumStatus";

export class UpdateUserPremiumStatusController {
  constructor(private updateUserPremiumStatus: UpdateUserPremiumStatus) {}

  async updatePremiumStatus(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.userId;
      const user = await this.updateUserPremiumStatus.execute(userId);

      res.status(200).json({
        success: true,
        message: "User premium status updated successfully",
        user,
      });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message,
      });
    }
  }
}