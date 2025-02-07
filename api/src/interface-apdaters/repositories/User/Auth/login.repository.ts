// src/infrastructure/repositories/UserRepository.ts
import { IUserRepository } from "../../../../entities/repositoryInterface/interface.loginRepository";
import { Iuser } from "../../../../entities/modelInterface/User";
import { UserModal } from "../../../../frameworks/databaseModels/UserModel";

export class LoginRepository implements IUserRepository {
  async findByEmail(email: string): Promise<Iuser | null> {
    return UserModal.findOne({ email });
  }
}