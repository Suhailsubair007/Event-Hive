// src/interface-adapters/controllers/FetchUserDetailsController.ts
import { Request, Response } from "express";
import { FetchUserDetails } from "../../../use-cases/user/User/getProfileDetails";

export class FetchUserDetailsController {
  constructor(private fetchUserDetailsController: FetchUserDetails) {}

  async fetchUserDetails(req: Request, res: Response): Promise<void> {
    try {
      const email = req.query.email as string;
      console.log(email)
      const user = await this.fetchUserDetailsController.execute(email);

      res.status(200).json({ success: true, user });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message,
      });
    }
  }
}