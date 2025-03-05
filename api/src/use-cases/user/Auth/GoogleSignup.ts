import { IUserRepository } from "../../../entities/repositoryInterface/User/Interface.userRepository";
import { Iuser } from "../../../entities/modelInterface/User";
import { TokenService } from "../../../frameworks/Servise/Tocken.servise";
import { CustomError } from "../../../shared/utils/CustomError";

export class GoogleSignUp {
  constructor(private userRepository: IUserRepository) {}

  async execute(
    name: string,
    googleId: string,
    email: string
  ): Promise<{
    accessToken: string;
    refreshToken: string;
    user: { name: string; email: string; id: string; role: string;  location?: { latitude: number; longitude: number }; };
  }> {
    let user = await this.userRepository.findByEmail(email);

    if (user) {
      if (!user.googleId) {
        user = await this.userRepository.updateUser(user._id!, {
          googleId,
          isActive: true,
        });
      }

      if (!user?.isActive) {
        throw new CustomError("User is not active", 403);
      }
    } else {
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
        location: user.location ? {
          latitude: user.location.latitude,
          longitude: user.location.longitude
        } : undefined,
      },
    };
  }
}
