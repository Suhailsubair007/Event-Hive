import { IUpdatePremiumUserRepository } from "../../../entities/repositoryInterface/User/UpdatePremiumUserRepository";
import { Iuser } from "../../../entities/modelInterface/User";

export class UpdateUserPremiumStatus {
  constructor(private userRepository: IUpdatePremiumUserRepository) {}

  async execute(userId: string): Promise<Iuser | null> {
    return this.userRepository.updateUserPremiumStatus(userId, true);
  }
}
