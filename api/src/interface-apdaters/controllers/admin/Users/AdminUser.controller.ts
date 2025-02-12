// src/interface-adapters/controllers/UserController.ts
import { Request, Response } from "express";
import { GetUsersByPremiumStatus } from "../../../../use-cases/admin/User/GetUsers";

export class AdminUserController {
  constructor(
    private getUsersByPremiumStatus: GetUsersByPremiumStatus
  ) {}

  async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const { isPremiumUser } = req.query;

      // Convert query parameter to boolean
      const isPremium = isPremiumUser === "true";

      const users = await this.getUsersByPremiumStatus.execute(isPremium);
      res.status(200).json({ success: true, users });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message,
      });
    }
  }
}