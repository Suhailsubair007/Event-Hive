import { Iuser } from "../../modelInterface/User";

export interface IAdminUserRepository {
  getUsersByPremiumStatus(
    isPremiumUser: boolean,
    page: number,
    limit: number
  ): Promise<Iuser[]>;
  findByEmail(email: string): Promise<Iuser | null>;
}