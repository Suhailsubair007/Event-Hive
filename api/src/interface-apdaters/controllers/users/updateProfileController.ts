import { Request, Response } from "express";
import { UpdateProfile } from "../../../use-cases/user/User/updateProfile";

export class UpdateProfileController {
  constructor(private updateProfileController: UpdateProfile) {}

  async updateProfile(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.userId;
      const updates = req.body;

      const user = await this.updateProfileController.execute(userId, updates);
      res.status(200).json({ success: true, user });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message,
      });
    }
  }
}
