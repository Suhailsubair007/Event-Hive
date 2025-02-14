// src/application/use-cases/LoginUser.ts
import { IUserRepository } from "../../../entities/repositoryInterface/User/interface.loginRepository";
import { CustomError } from "../../../shared/utils/CustomError";
import bcrypt from "bcrypt";

export class LoginUser {
  constructor(private userRepository: IUserRepository) {}

  async execute(
    email: string,
    password: string
  ): Promise<{ name: string; email: string; id: string }> {
    if (!email || !password) {
      throw new CustomError("All fields are required", 400);
    }

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new CustomError("Invalid email or password", 401);
    }

    if (!user.isActive) {
      throw new CustomError("User is blocked. Please contact support.", 403);
    }

    const isPasswordValid = user.password
      ? await bcrypt.compare(password, user.password)
      : false;

    if (!isPasswordValid) {
      throw new CustomError("Invalid credentials", 401);
    }

    return {
      name: user.name,
      email: user.email,
      id: user._id!,
    };
  }
}
