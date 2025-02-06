import { securePassword } from "../../../shared/utils/passwordHashUtil";
import { RegisterUserDTO } from "../../../shared/dto/UserDto";
import { CustomError } from "../../../shared/utils/CustomError";
import { Iuser } from "../../../entities/modelInterface/User";
import { IUserRepository } from "../../../entities/repositoryInterface/Interface.userRepository";

export class RegisterUser {
  constructor(private userRepository: IUserRepository) {}

  async execute(userData: RegisterUserDTO): Promise<{ email: string; name: string; phone?: string }> {
    const { email, password } = userData;

    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) throw new CustomError("User already exists", 400);

    const hashedPassword = await securePassword(password);
    const newUser: Iuser = { ...userData, password: hashedPassword };

    const createdUser = await this.userRepository.createUser(newUser);

    return {
      email: createdUser.email,
      name: createdUser.name,
      phone: createdUser.phone,
    };
  }
}
