import { ISubscriptionRepository } from "../../../entities/repositoryInterface/Admin/Interface.SubscriptionRepository";
import { ISubscription } from "../../../entities/modelInterface/Subscription";
import { CustomError } from "../../../shared/utils/CustomError";

export class CreateSubscription {
  constructor(private subscriptionRepository: ISubscriptionRepository) {}

  async execute(subscriptionData: ISubscription): Promise<ISubscription> {
    if (!subscriptionData.name || !subscriptionData.amount) {
      throw new CustomError("Name and amount are required", 400);
    }

    const existingSubscription = await this.subscriptionRepository.findByName(
      subscriptionData.name
    );
    if (existingSubscription) {
      throw new CustomError("Subscription name already exists", 400);
    }

    const subscription = await this.subscriptionRepository.createSubscription(
      subscriptionData
    );
    if (!subscription) {
      throw new CustomError("Failed to create subscription", 500);
    }

    return subscription;
  }
}
