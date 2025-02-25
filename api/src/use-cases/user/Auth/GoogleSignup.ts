import { IUserRepository } from "../../../entities/repositoryInterface/User/Interface.userRepository";
import { Iuser } from "../../../entities/modelInterface/User";
import { TokenService } from "../../../frameworks/Servise/Tocken.servise";

export class GoogleSignUp {
  constructor(private userRepository: IUserRepository) {}

  async execute(
    name: string,
    googleId: string,
    email: string
  ): Promise<{
    accessToken: string;
    refreshToken: string;
    user: { name: string; email: string; id: string; role: string };
  }> {
    let user = await this.userRepository.findByEmail(email);

    if (!user) {
      user = await this.userRepository.createUser({
        name,
        email,
        googleId,
      });
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
