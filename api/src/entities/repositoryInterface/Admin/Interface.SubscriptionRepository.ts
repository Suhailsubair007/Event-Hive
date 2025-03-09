import { ISubscription } from "../../modelInterface/Subscription";

export interface ISubscriptionRepository {
  create(subscription: ISubscription): Promise<ISubscription>;
}
