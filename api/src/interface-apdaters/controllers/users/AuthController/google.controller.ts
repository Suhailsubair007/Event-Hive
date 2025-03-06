import { Request, Response } from "express";
import { GoogleLogin } from "../../../../use-cases/user/Auth/GoogleLogin";
import { GoogleSignUp } from "../../../../use-cases/user/Auth/GoogleSignup";

export class GoogleController {
  constructor(
    private googleLogin: GoogleLogin,
    private googleSignup: GoogleSignUp
  ) {}
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, name, sub: googleId } = req.body;
      const { user, accessToken, refreshToken } =
        await this.googleLogin.execute(name, googleId, email);
      res.status(200).json({
        success: true,
        message: "Google login successful",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          location: user.location || null,
          isPremium: user.isPremiumUser,
        },
        accessToken,
        refreshToken,
      });
    } catch (error: any) {
      console.error(error);
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }
  async signup(req: Request, res: Response): Promise<void> {
    try {
      const { email, name, sub: googleId } = req.body;

      const { user, accessToken, refreshToken } =
        await this.googleSignup.execute(name, googleId, email);

      res.status(200).json({
        success: true,
        message: "Google signup successful",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          location: user.location || null,
          isPremium: user.isPremiumUser,
        },
        accessToken,
        refreshToken,
      });
    } catch (error: any) {
      console.error("Error during Google sign-in:", error);
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }
}
