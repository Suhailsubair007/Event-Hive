import { Iuser } from "../../modelInterface/User";

export interface IAdminUserRepository {
  getUsersByPremiumStatus(isPremiumUser: boolean): Promise<Iuser[]>;
}
