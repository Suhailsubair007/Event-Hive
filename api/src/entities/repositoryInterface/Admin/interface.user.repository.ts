import { Iuser } from "../../modelInterface/User";

export interface IAdminUserRepository {
  getUsersByPremiumStatus(isPremiumUser: boolean): Promise<Iuser[]>;
  findByEmail(email: string): Promise<Iuser | null>;
}
