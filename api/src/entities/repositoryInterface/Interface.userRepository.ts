import { Iuser } from "../../entities/modelInterface/User";

export interface IUserRepository {
  findByEmail(email: string): Promise<Iuser | null>;
  createUser(user: Iuser): Promise<Iuser>;
}
