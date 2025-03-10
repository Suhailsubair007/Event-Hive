import express from "express";

const subscriptionRoutes = express.Router();

import { createSubscriptionController } from "../di/Admin/subscription.dependenContainer";

subscriptionRoutes.post("/subscriptions", (req, res) =>
  createSubscriptionController.create(req, res)
);

export default subscriptionRoutes;
