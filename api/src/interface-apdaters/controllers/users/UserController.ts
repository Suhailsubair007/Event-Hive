import { Request, Response } from "express";
import { CreateUser } from "../../../use-cases/user/CreateUser";
import { LoginUser } from "../../../use-cases/user/LoginUser";

export class UserController {
  constructor(private createUser: CreateUser, private loginUser: LoginUser) {}

  async register(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      console.log("=====================reached=====================")
      console.log(email, password)
      const user = await this.createUser.execute(email, password);
      res.status(201).json({
        sucess: true,
        message: "User created successfully",
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        sucess: false,
        message: "Internal server error",
      });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const isAuth = await this.loginUser.execute(email, password);
      if (isAuth) {
        res.status(200).json({
          sucess: true,
          message: "User logged in successfully",
        });
      } else {
        res.status(401).json({
          sucess: false,
          message: "Invalid credentials",
        });
      }
    } catch (error) {
      res.status(500).json({
        sucess: false,
        message: "Internal server error",
      });
    }
  }
}
