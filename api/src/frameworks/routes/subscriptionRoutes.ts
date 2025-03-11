import express from "express";
import {
  createSubscriptionController,
  updateSubscriptionController,
  createUserSubscriptionController,
} from "../di/Admin/subscription.dependenContainer";

const router = express.Router();

router
  .post(
    "/add",
    createSubscriptionController.create.bind(createSubscriptionController)
  )
  .patch(
    "/edit/:id",
    updateSubscriptionController.update.bind(updateSubscriptionController)
  )
  .post(
    "/user-subscriptions",
    createUserSubscriptionController.create.bind(
      createUserSubscriptionController
    )
  );

export default router;
