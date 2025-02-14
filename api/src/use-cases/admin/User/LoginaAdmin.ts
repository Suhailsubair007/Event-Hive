import { IAdminRepository } from "../.../../../../entities/repositoryInterface/Admin/interface.loginRepository";
import { CustomError } from "../../../shared/utils/CustomError";
import bcrypt from "bcrypt";

export class AdminLogin {
  constructor(private userRepository: IAdminRepository) {}

  async execute(
    email: string,
    password: string
  ): Promise<{ name: string; email: string }> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new CustomError("Invalid email or password", 401);
    }

    if (user.role !== "admin") {
      throw new CustomError("Unauthorized: User is not an admin", 403);
    }

    const isPasswordValid = user.password
      ? await bcrypt.compare(password, user.password)
      : false;

    if (!isPasswordValid) {
      throw new CustomError("Invalid email or password", 401);
    }

    return {
      name: user.name,
      email: user.email,
    };
  }
}
