import { IUserRepository } from "../../../entities/repositoryInterface/User/Interface.userRepository";
import { Iuser } from "../../../entities/modelInterface/User";
import { CustomError } from "../../../shared/utils/CustomError";

export class GoogleLogin {
  constructor(private userRepository: IUserRepository) {}

  async execute(email: string, name: string, googleId: string): Promise<Iuser> {
    let user = await this.userRepository.findByEmail(email);

    if (user && !user.isActive) {
      throw new CustomError("User is blocked. Please contact support.", 403);
    }

    if (!user) {
      user = await this.userRepository.createUser({
        email,
        name,
        googleId,
      });
    }

    return user;
  }
}
