import { IUserRepository } from "../../../entities/repositoryInterface/User/Interface.userRepository";
import { Iuser } from "../../../entities/modelInterface/User";
import { CustomError } from "../../../shared/utils/CustomError";
import { TokenService } from "../../../frameworks/Servise/Tocken.servise";


export class GoogleLogin {
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
    console.log("Finded user from the google login", user);

    if (user && !user.googleId) {
      user = await this.userRepository.updateUser(user._id!, { googleId });
    }

    if (user && !user.isActive) {
      throw new CustomError("User is blocked. Please contact support.", 403);
    }

    if (!user) {
      user = await this.userRepository.createUser({
        email,
        name,
        googleId,
        isActive: true,
        role: "user",
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
