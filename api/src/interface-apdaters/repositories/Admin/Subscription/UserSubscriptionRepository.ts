import { IUserSubscriptionRepository } from "../../../../entities/repositoryInterface/Admin/interface.UserSubscription";
import { UserSubscription } from "../../../../entities/modelInterface/UserSubscription";
import UserSubscriptionModel from "../../../../frameworks/databaseModels/UserSubscriptionModel";

export class UserSubscriptionRepository implements IUserSubscriptionRepository {
  async createUserSubscription(
    userSubscription: UserSubscription
  ): Promise<UserSubscription> {
    const newUserSubscription = new UserSubscriptionModel(userSubscription);
    const savedUserSubscription = await newUserSubscription.save();
    return savedUserSubscription.toObject();
  }

  async findUserSubscriptionById(id: string): Promise<UserSubscription | null> {
    const userSubscription = await UserSubscriptionModel.findById(id);
    return userSubscription ? userSubscription.toObject() : null;
  }

  async updateUserSubscription(
    id: string,
    updates: Partial<UserSubscription>
  ): Promise<UserSubscription | null> {
    const userSubscription = await UserSubscriptionModel.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true }
    );
    return userSubscription ? userSubscription.toObject() : null;
  }
}
