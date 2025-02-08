import { Request, Response } from "express";
import { updateUserPreference } from "../../../../use-cases/user/Auth/userPreference";
import { UserPreferencesDTO } from "../../../../shared/dto/userPreferenceDTO";

export class UserPreferenceController {
  constructor(private updateUsrPreference: updateUserPreference) {}
  async updatePreference(req: Request, res: Response): Promise<void> {
    try {
      const { email, preferences, location } = req.body;
      const userData: UserPreferencesDTO = { email, preferences, location };

      await this.updateUsrPreference.execute(userData);
      res.status(200).json({
        success: true,
        message: "User preference updated successfully",
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}
