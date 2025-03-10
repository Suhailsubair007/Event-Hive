import { ISubscription } from "../../modelInterface/Subscription";

export interface ISubscriptionRepository {
  createSubscription(subscription: ISubscription): Promise<ISubscription>;
}
