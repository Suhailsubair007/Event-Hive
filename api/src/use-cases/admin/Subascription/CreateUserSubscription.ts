import { IUserSubscriptionRepository } from "../../../entities/repositoryInterface/Admin/interface.UserSubscription";
import { UserSubscription } from "../../../entities/modelInterface/UserSubscription";
import { CustomError } from "../../../shared/utils/CustomError";

export class CreateUserSubscription {
  constructor(
    private userSubscriptionRepository: IUserSubscriptionRepository
  ) {}

  async execute(
    userSubscriptionData: UserSubscription
  ): Promise<UserSubscription> {
    if (
      !userSubscriptionData.userId ||
      !userSubscriptionData.planId ||
      !userSubscriptionData.endDate
    ) {
      throw new CustomError("userId, planId, and endDate are required", 400);
    }


    const userSubscription =
      await this.userSubscriptionRepository.createUserSubscription(
        userSubscriptionData
      );
    return userSubscription;
  }
}
