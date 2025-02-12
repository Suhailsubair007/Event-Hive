import { IUserRepository } from "../../../../entities/repositoryInterface/User/Interface.userRepository";
import { Iuser } from "../../../../entities/modelInterface/User";
import {UserModal  } from "../../../../frameworks/databaseModels/UserModel";

export class UserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<Iuser | null> {
    return UserModal.findOne({ email });
  }

  async createUser(user: Iuser): Promise<Iuser> {
    const newUser = new UserModal(user);
    await newUser.save();
    return newUser;
  }
}
