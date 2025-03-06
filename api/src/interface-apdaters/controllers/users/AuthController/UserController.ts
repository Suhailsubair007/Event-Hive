import { Request, Response } from "express";
import { RegisterUser } from "../../../../use-cases/user/Auth/RegisterUser";
import { RegisterUserDTO } from "../../../../shared/dto/UserDto";

export class UserController {
  constructor(private registerUser: RegisterUser) {}

  async register(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, phone, password } = req.body;
      const userData: RegisterUserDTO = { name, email, phone, password };

      const { user, accessToken, refreshToken } =
        await this.registerUser.execute(userData);
      res.status(201).json({
        success: true,
        message: "User registered successfully",
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
      res.status(500).json({ message: error.message });
    }
  }
}
