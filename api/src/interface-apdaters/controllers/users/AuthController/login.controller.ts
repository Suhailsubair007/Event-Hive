import { Request, Response } from "express";
import { LoginUser } from "../../../../use-cases/user/Auth/loginUser";

export class LoginController {
  constructor(private loginUser: LoginUser) {}

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await this.loginUser.execute(email, password);
      res.status(200).json({
        success: true,
        message: "User logged in successfully",
        result,
      });
    } catch (error:any) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    } 
  }
}
