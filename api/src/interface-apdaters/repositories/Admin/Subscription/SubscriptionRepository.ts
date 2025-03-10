import { ISubscriptionRepository } from "../../../../entities/repositoryInterface/Admin/Interface.SubscriptionRepository";
import { ISubscription } from "../../../../entities/modelInterface/Subscription";
import { SubscriptionModel } from "../../../../frameworks/databaseModels/SubscriptionModel"; 

export class SubscriptionRepository implements ISubscriptionRepository {
  async createSubscription(
    subscription: ISubscription
  ): Promise<ISubscription> {
    const newSubscription = new SubscriptionModel(subscription);
    const savedSubscription = await newSubscription.save();
    return savedSubscription.toObject();
  }
}
