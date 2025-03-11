import express from "express";

const subscriptionRoutes = express.Router();

import { createSubscriptionController , updateSubscriptionController} from "../di/Admin/subscription.dependenContainer";

subscriptionRoutes.post("/add", (req, res) =>
  createSubscriptionController.create(req, res)
);

subscriptionRoutes.patch("/edit/:id", (req, res) =>
  updateSubscriptionController.update(req, res)
);

export default subscriptionRoutes;
    