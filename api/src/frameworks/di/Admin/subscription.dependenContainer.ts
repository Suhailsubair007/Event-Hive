import { CreateSubscriptionController } from "../../../interface-apdaters/controllers/admin/subscription/CreateSubscriptionController";
import { SubscriptionRepository } from "../../../interface-apdaters/repositories/Admin/Subscription/SubscriptionRepository";
import { CreateSubscription } from "../../../use-cases/admin/Subascription/CreateSubscription";

const subscriptionRepository = new SubscriptionRepository();
const createSubscription = new CreateSubscription(subscriptionRepository);
const createSubscriptionController = new CreateSubscriptionController(
  createSubscription
);

export { createSubscriptionController };
