import { IUpdatePremiumUserRepository } from "../../../../entities/repositoryInterface/User/UpdatePremiumUserRepository";
import { Iuser } from "../../../../entities/modelInterface/User";
import { UserModal } from "../../../../frameworks/databaseModels/UserModel";
import { CustomError } from "../../../../shared/utils/CustomError";

export class UpdateUserRepository implements IUpdatePremiumUserRepository {

  async updateUserPremiumStatus(userId: string, isPremiumUser: boolean): Promise<Iuser | null> {
    const updatedUser = await UserModal.findByIdAndUpdate(
      userId,
      { isPremiumUser },
      { new: true }
    );

    if (!updatedUser) {
      throw new CustomError("User not found", 404);
    }

    return updatedUser;
  }
}