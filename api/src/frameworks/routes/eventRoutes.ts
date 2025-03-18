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
  getEventDetailsController,
  bookEventController,
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

eventRoutes.get(
  "/events",
  authenticateToken,
  authorizeRoles(["user"]),
  (req, res) => listEventsController.listEvents(req, res)
);

eventRoutes.delete(
  "/events/:eventId",
  authenticateToken,
  authorizeRoles(["user"]),
  (req, res) => deleteEventController.deleteEvent(req, res)
);

eventRoutes.get(
  "/events/:eventId",
  // authenticateToken,
  // authorizeRoles(["user"]),
  (req, res) => getEventDetailsController.getEventDetails(req, res)
);

eventRoutes.post(
  "/book",
  // authenticateToken,
  // authorizeRoles(["user"]),
  (req, res) => bookEventController.bookEvent(req, res)
);
// eventRoutes
//   .route("/events")
//   .post(authenticateToken, authorizeRoles(["user"]), (req, res) => addEventController.addEvent(req, res))
//   .get(authenticateToken, authorizeRoles(["user"]), (req, res) => listEventsController.listEvents(req, res));

// eventRoutes
//   .route("/events/:eventId")
//   .post(authenticateToken, authorizeRoles(["user"]), (req, res) => editEventController.editEvent(req, res))
//   .delete(authenticateToken, authorizeRoles(["user"]), (req, res) => deleteEventController.deleteEvent(req, res));

export default eventRoutes;
