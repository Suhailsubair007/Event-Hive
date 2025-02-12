import { IAdminUserRepository } from "../../../../entities/repositoryInterface/Admin/interface.user.repository";
import { Iuser } from "../../../../entities/modelInterface/User";
import { UserModal } from "../../../../frameworks/databaseModels/UserModel";

export class AdminUserRepository implements IAdminUserRepository {
  async getUsersByPremiumStatus(isPremiumUser: boolean): Promise<Iuser[]> {
    return UserModal.find({ isPremiumUser });
  }
  async findByEmail(email: string): Promise<Iuser | null> {
    return UserModal.findOne({ email });
  }
}
