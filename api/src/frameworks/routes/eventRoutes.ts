import express from "express";
import {
  authenticateToken,
  authorizeRoles,
} from "../../interface-apdaters/middleware/auth";

import {
  addEventController,
  editEventController,
  listEventsController,
  deleteEventController,
} from "../di/User/Event.dependency.container";

const eventRoutes = express.Router();

eventRoutes.post(
  "/add",
  authenticateToken,
  authorizeRoles(["user"]),
  (req, res) => addEventController.addEvent(req, res)
);
eventRoutes.post(
  "/edit/:eventId",
  authenticateToken,
  authorizeRoles(["user"]),
  (req, res) => editEventController.editEvent(req, res)
);

eventRoutes.get("/events", (req, res) =>
  listEventsController.listEvents(req, res)
);

eventRoutes.delete("/events/:eventId", (req, res) =>
  deleteEventController.deleteEvent(req, res)
);

export default eventRoutes;
