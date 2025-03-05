// src/application/use-cases/FetchUserDetails.ts
import { IUserRepository } from "../../../entities/repositoryInterface/User/Interface.userRepository";
import { CustomError } from "../../../shared/utils/CustomError";
import { Iuser } from "../../../entities/modelInterface/User";

export class FetchUserDetails {
  constructor(private userRepository: IUserRepository) {}

  async execute(userId: string): Promise<Iuser | null> {
    const user = await this.userRepository.findByEmail(userId);
    if (!user) {
      throw new CustomError("User not found", 404);
    }
    return user;
  }
}