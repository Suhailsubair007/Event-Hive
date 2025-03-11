import { CreateSubscriptionController } from "../../../interface-apdaters/controllers/admin/subscription/CreateSubscriptionController";
import { SubscriptionRepository } from "../../../interface-apdaters/repositories/Admin/Subscription/SubscriptionRepository";
import { CreateSubscription } from "../../../use-cases/admin/Subascription/CreateSubscription";
import { UpdateSubscription } from "../../../use-cases/admin/Subascription/UpdateSubscription";
import { UpdateSubscriptionController } from "../../../interface-apdaters/controllers/admin/subscription/UpdateSubscriptionController";

const subscriptionRepository = new SubscriptionRepository();

const createSubscription = new CreateSubscription(subscriptionRepository);
const createSubscriptionController = new CreateSubscriptionController(
  createSubscription
);

const updateSubscription = new UpdateSubscription(subscriptionRepository);
const updateSubscriptionController = new UpdateSubscriptionController(
  updateSubscription
);

export { createSubscriptionController, updateSubscriptionController };
