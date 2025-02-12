import { IUserPreferenceRepository } from "../../../../entities/repositoryInterface/User/interface.Userpreference";
import { UserModal } from "../../../../frameworks/databaseModels/UserModel";

export class UserPreferenceRepository implements IUserPreferenceRepository {
  async findByEmail(email: string) {
    return UserModal.findOne({ email });
  }

  async updateUser(
    email: string,
    preferences: string[],
    location: { latitude: number; longitude: number }
  ) {
    const updatedUser = await UserModal.findOneAndUpdate(
      { email },
      { $set: { preferences, location } }, 
      { new: true }
    );
    if (!updatedUser) {
      throw new Error("User not found");
    }
    return updatedUser;
  }
}
