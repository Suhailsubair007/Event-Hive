import { ISubscription } from "../../modelInterface/Subscription";

export interface ISubscriptionRepository {
  createSubscription(subscription: ISubscription): Promise<ISubscription>;
  updateSubscription(
    id: string,
    updates: Partial<ISubscription>
  ): Promise<ISubscription | null>;
  findByName(name: string): Promise<ISubscription | null>;
}
