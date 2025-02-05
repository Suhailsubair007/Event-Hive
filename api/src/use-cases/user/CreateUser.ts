import { Iuser, UserModal } from "../../entities/User";

export class CreateUser {
  async execute(email: string, password: string): Promise<Iuser> {
    console.log("reached db execute")
    const user = new UserModal({ email, password });
    await user.save();
    return user;
    console.log("sdfgsdfgsdfg")
    console.log(user)
  }
}
  