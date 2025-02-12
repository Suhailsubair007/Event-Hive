import { IAdminUserRepository } from "../../../entities/repositoryInterface/Admin/interface.user.repository";
import { Iuser } from "../../../entities/modelInterface/User";

export class GetUsersByPremiumStatus {
  constructor(private userRepository: IAdminUserRepository) {}

  async execute(isPremiumUser: boolean): Promise<Iuser[]> {
    return this.userRepository.getUsersByPremiumStatus(isPremiumUser);
  }
}
