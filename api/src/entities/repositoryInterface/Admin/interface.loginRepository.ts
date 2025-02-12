import { Iuser } from "../../modelInterface/User";

export interface IAdminRepository {
  findByEmail(email: string): Promise<Iuser | null>;
}
