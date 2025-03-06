import { Request, Response } from "express";
import { LoginUser } from "../../../../use-cases/user/Auth/loginUser";

export class LoginController {
  constructor(private loginUser: LoginUser) {}

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const { accessToken, refreshToken, user } = await this.loginUser.execute(
        email,
        password
      );
      res.status(200).json({
        success: true,
        message: "User logged in successfully",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          location: user.location || null,
          isPremium:user.isPremiumUser
        },
        accessToken,
        refreshToken,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}
