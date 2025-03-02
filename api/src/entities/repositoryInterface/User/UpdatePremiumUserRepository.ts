import { Iuser } from "../../../entities/modelInterface/User";

export interface IUpdatePremiumUserRepository {
    updateUserPremiumStatus(userId: string, isPremiumUser: boolean): Promise<Iuser | null>;
  }
  