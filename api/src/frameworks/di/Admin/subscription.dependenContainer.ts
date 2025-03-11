import cron from 'node-cron'
import { CreateSubscriptionController } from "../../../interface-apdaters/controllers/admin/subscription/CreateSubscriptionController";
import { SubscriptionRepository } from "../../../interface-apdaters/repositories/Admin/Subscription/SubscriptionRepository";
import { CreateSubscription } from "../../../use-cases/admin/Subascription/CreateSubscription";
import { UpdateSubscription } from "../../../use-cases/admin/Subascription/UpdateSubscription";
import { UpdateSubscriptionController } from "../../../interface-apdaters/controllers/admin/subscription/UpdateSubscriptionController";
import { CreateUserSubscriptionController } from "../../../interface-apdaters/controllers/admin/subscription/CreateUserSubscriptionController";
import { UserSubscriptionRepository } from "../../../interface-apdaters/repositories/Admin/Subscription/UserSubscriptionRepository";
import { CreateUserSubscription } from "../../../use-cases/admin/Subascription/CreateUserSubscription";

const subscriptionRepository = new SubscriptionRepository();

const createSubscription = new CreateSubscription(subscriptionRepository);
const createSubscriptionController = new CreateSubscriptionController(
  createSubscription
);

const updateSubscription = new UpdateSubscription(subscriptionRepository);
const updateSubscriptionController = new UpdateSubscriptionController(
  updateSubscription
);

const userSubscriptionRepository = new UserSubscriptionRepository();
const createUserSubscription = new CreateUserSubscription(
  userSubscriptionRepository
);
const createUserSubscriptionController = new CreateUserSubscriptionController(
  createUserSubscription
);


// cron.schedule("*/1 * * * *", async () => {
//   console.log("Running subscription expiration check...");
//   const expiredSubscriptions = await userSubscriptionRepository.findExpiredSubscriptions();

//   for (const subscription of expiredSubscriptions) {
//     await userSubscriptionRepository.updateUserSubscription(subscription._id, { isActive: false });
//     console.log(`Subscription ${subscription._id} has been deactivated.`);
//   }
// });

export {
  createSubscriptionController,
  updateSubscriptionController,
  createUserSubscriptionController,
};
