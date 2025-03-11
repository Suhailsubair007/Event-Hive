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
  async updateSubscription(
    id: string,
    updates: Partial<ISubscription>
  ): Promise<ISubscription | null> {
    const subscription = await SubscriptionModel.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true } 
    );
    return subscription ? subscription.toObject() : null;
  }

  async findByName(name: string): Promise<ISubscription | null> {
    const subscription = await SubscriptionModel.findOne({ name });
    console.log("Find by name ==>",subscription)
    return subscription ? subscription.toObject() : null;
  }
}
