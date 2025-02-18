import { Request, Response } from "express";
import { GoogleSignUp } from "../../../../use-cases/user/Auth/GoogleLogin";
import { GoogleLogin } from "../../../../use-cases/user/Auth/GoogleSignUp";

export class GoogleController {
  constructor(
    private googleLogin: GoogleLogin,
    private googleSignup: GoogleSignUp
  ) {}
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, name, sub: googleId } = req.body;
      console.log(email , name, googleId)
      const user = await this.googleLogin.execute(email, name, googleId);
      res.status(200).json({
        success: true,
        message: "Login successful",
        user,
      });
    } catch (error: any) {
      console.error(error);
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }
  async signup(req: Request, res: Response): Promise<void> {
    try {
      const { email, name, sub: googleId } = req.body;

      const user = await this.googleSignup.execute(name, email, googleId);

      res.status(200).json({
        message: "User successfully signed in",
        user,
      });
    } catch (error: any) {
      console.error("Error during Google sign-in:", error);
      res.status(500).json({ message: "Failed to authenticate Google user" });
    }
  }
}
