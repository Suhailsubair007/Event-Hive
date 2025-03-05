// src/infrastructure/repositories/UserRepository.ts
import { IUpdateProfileRepository } from "../../../entities/repositoryInterface/User/interface.updateProfileRepository";
import { Iuser } from "../../../entities/modelInterface/User";
import { UserModal } from "../../../frameworks/databaseModels/UserModel";
import { CustomError } from "../../../shared/utils/CustomError";

export class updateProfileRepository implements IUpdateProfileRepository {
  async updateUser(
    userId: string,
    updates: Partial<Iuser>
  ): Promise<Iuser | null> {
    const updatedUser = await UserModal.findByIdAndUpdate(userId, updates, {
      new: true,
    });
    if (!updatedUser) {
      throw new CustomError("User not found", 404);
    }

    return updatedUser;
  }
}
