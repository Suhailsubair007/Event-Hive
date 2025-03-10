import { Request, Response } from "express";
import { GetUsersByPremiumStatus } from "../../../../use-cases/admin/User/GetUsers";
import {AdminLogin} from '../../../../use-cases/admin/User/LoginaAdmin'

export class AdminUserController {
  constructor(
    private getUsersByPremiumStatus: GetUsersByPremiumStatus,
    private loginAdmin : AdminLogin
  ) {}

  async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const { isPremiumUser, page, limit } = req.query;

      // Convert query parameters to appropriate types
      const isPremium = isPremiumUser === "true";
      const pageNumber = parseInt(page as string) || 1; 
      const limitNumber = parseInt(limit as string) || 10; 

      const users = await this.getUsersByPremiumStatus.execute(
        isPremium,
        pageNumber,
        limitNumber
      );

      res.status(200).json({ success: true, users });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async adminLogin(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const { accessToken, refreshToken }  = await this.loginAdmin.execute(email, password);

      res.status(200).json({
        email,
        success: true,
        message: "Admin logged in successfully",
        accessToken,
        refreshToken,
      });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message,
      });
    }
  }
} 