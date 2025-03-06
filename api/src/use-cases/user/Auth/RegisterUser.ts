import { securePassword } from "../../../shared/utils/passwordHashUtil";
import { RegisterUserDTO } from "../../../shared/dto/UserDto";
import { CustomError } from "../../../shared/utils/CustomError";
import { Iuser } from "../../../entities/modelInterface/User";
import { TokenService } from "../../../frameworks/Servise/Tocken.servise";
import { IUserRepository } from "../../../entities/repositoryInterface/User/Interface.userRepository";

export class RegisterUser {
  constructor(private userRepository: IUserRepository) {}

  async execute(userData: RegisterUserDTO): Promise<{
    accessToken: string;
    refreshToken: string;
    user: {
      name: string;
      email: string;
      id: string;
      role: string;
      isPremiumUser?: boolean;

      location?: { latitude: number; longitude: number };
    };
  }> {
    const { email, password } = userData;

    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) throw new CustomError("User already exists", 400);

    const hashedPassword = await securePassword(password);

    // const newUser: Iuser = { ...userData, password: hashedPassword };
    const newUser: Iuser = {
      ...userData,
      password: hashedPassword,
      isActive: true,
      role: "user",
    };

    const createdUser = await this.userRepository.createUser(newUser);

    const accessToken = TokenService.generateAccessToken({
      id: createdUser._id!,
      role: createdUser.role,
    });
    const refreshToken = TokenService.generateRefreshToken({
      id: createdUser._id!,
      role: createdUser.role,
    });

    return {
      accessToken,
      refreshToken,
      user: {
        id: createdUser._id!,
        name: createdUser.name,
        email: createdUser.email,
        role: createdUser.role || "user",
        location: createdUser.location
          ? {
              latitude: createdUser.location.latitude,
              longitude: createdUser.location.longitude,
            }
          : undefined,
        isPremiumUser: createdUser.isPremiumUser,
      },
    };
  }
}
