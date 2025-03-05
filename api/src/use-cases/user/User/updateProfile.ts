import { IUpdateProfileRepository } from "../../../entities/repositoryInterface/User/interface.updateProfileRepository";
import { Iuser } from "../../../entities//modelInterface/User";
import { CustomError } from "../../../shared/utils/CustomError";

export class UpdateProfile {
  constructor(private userRepository: IUpdateProfileRepository) {}

  async execute(
    userId: string,
    updates: Partial<Iuser>
  ): Promise<Iuser | null> {
    const updatedUser = await this.userRepository.updateUser(userId, updates);
    if (!updatedUser) {
      throw new CustomError("User not found", 404);
    }
    return updatedUser;
  }
}
