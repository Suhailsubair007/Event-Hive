import { ISubscriptionRepository } from "../../../entities/repositoryInterface/Admin/Interface.SubscriptionRepository";
import { ISubscription } from "../../../entities/modelInterface/Subscription";
import { CustomError } from "../../../shared/utils/CustomError";

export class UpdateSubscription {
  constructor(private subscriptionRepository: ISubscriptionRepository) {}

  async execute(
    id: string,
    updates: Partial<ISubscription>
  ): Promise<ISubscription> {
    const existingSubscription =
      await this.subscriptionRepository.updateSubscription(id, {});
    if (!existingSubscription) {
      throw new CustomError("Subscription not found", 404);
    }

    if (updates.name && updates.name !== existingSubscription.name) {
      const duplicateSubscription =
        await this.subscriptionRepository.findByName(updates.name);
      if (duplicateSubscription) {
        throw new CustomError("Subscription name already exists", 400);
      }
    }

    const updatedSubscription =
      await this.subscriptionRepository.updateSubscription(id, updates);
    if (!updatedSubscription) {
      throw new CustomError("Failed to update subscription", 500);
    }

    return updatedSubscription;
  }
}
