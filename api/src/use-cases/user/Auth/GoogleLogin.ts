import { IUserRepository } from "../../../entities/repositoryInterface/User/Interface.userRepository";
import { Iuser } from "../../../entities/modelInterface/User";
import { TokenService } from "../../../frameworks/Servise/Tocken.servise";
import { CustomError } from "../../../shared/utils/CustomError";

export class GoogleSignUp {
  constructor(private userRepository: IUserRepository) {}

  async execute(
    name: string,
    email: string,
    googleId: string
  ): Promise<{
    accessToken: string;
    refreshToken: string;
    user: { name: string; email: string; id: string; role: string };
  }> {
    if (!email || !googleId) {
      throw new CustomError("Email and Google ID are required", 400);
    }

    let user = await this.userRepository.findByEmail(email);

    if (!user) {
      // If user does not exist, create a new user
      user = await this.userRepository.createUser({
        name,
        email,
        googleId,
      });
    }

    if (!user.isActive) {
      throw new CustomError("User is blocked. Please contact support.", 403);
    }


    const accessToken = TokenService.generateAccessToken({
      id: user._id!,
      role: user.role,
    });

    const refreshToken = TokenService.generateRefreshToken({
      id: user._id!,
      role: user.role,
    });

    return {
      accessToken,
      refreshToken,
      user: {
        id: user._id!,
        name: user.name,
        email: user.email,
        role: user.role || "user",
      },
    };
  }
}
