import { UserSubscription } from "../../../entities/modelInterface/UserSubscription";

export interface IUserSubscriptionRepository {
  createUserSubscription(userSubscription: UserSubscription): Promise<UserSubscription>;
  findUserSubscriptionById(id: string): Promise<UserSubscription | null>;
  updateUserSubscription(id: string, updates: Partial<UserSubscription>): Promise<UserSubscription | null>;
}