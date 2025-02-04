import { Iuser, UserModal } from "../../entities/User";

export class CreateUser {
  async execute(email: string, password: string): Promise<Iuser> {
    const user = new UserModal({ email, password });
    await user.save();
    return user;
  }
}
  