import { Iuser } from "../../../../entities/modelInterface/User";
import { IUserRepository } from "../../../../entities/repositoryInterface/User/interface.loginRepository";
import { UserModal } from "../../../../frameworks/databaseModels/UserModel";

export class GoogleAuthRepository implements IUserRepository {
  async findByEmail(email: string): Promise<Iuser | null> {
    return UserModal.findOne({ email });
  }
  async createUser(user: Iuser): Promise<Iuser> {
    const newUser = new UserModal(user);
    return await newUser.save();
  }
}
