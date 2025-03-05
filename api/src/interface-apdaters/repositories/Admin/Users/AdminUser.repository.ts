import { IAdminUserRepository } from "../../../../entities/repositoryInterface/Admin/interface.user.repository";
import { Iuser } from "../../../../entities/modelInterface/User";
import { UserModal } from "../../../../frameworks/databaseModels/UserModel";

export class AdminUserRepository implements IAdminUserRepository {
  async getUsersByPremiumStatus(
    isPremiumUser: boolean,
    page: number,
    limit: number
  ): Promise<Iuser[]> {
    return UserModal.find({ isPremiumUser })
      .skip((page - 1) * limit) // Skip records based on the page number
      .limit(limit); // Limit the number of records per page
  }
  async findByEmail(email: string): Promise<Iuser | null> {
    return UserModal.findOne({ email });
  }
}
