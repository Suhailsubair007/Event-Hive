import express from "express";
import { categoryController } from "../di/Admin/Cathegory.dependencyContainer";
import { userController } from "../di/Admin/User.dependencyContainer";
import {
  authenticateToken,
  authorizeRoles,
} from "../../interface-apdaters/middleware/auth";
import { listAllEventsController } from "../di/Admin/Events.dependencyContainer";

const adminRoutes = express.Router();

adminRoutes.post(
  "/categories",
  authenticateToken,
  authorizeRoles(["admin"]),
  (req, res) => categoryController.add(req, res)
);
adminRoutes.post(
  "/categories/:id",
  authenticateToken,
  authorizeRoles(["admin"]),
  (req, res) => categoryController.edit(req, res)
);
adminRoutes.patch(
  "/categories/:id/list",
  authenticateToken,
  authorizeRoles(["admin"]),
  (req, res) => categoryController.listUnlist(req, res)
);
adminRoutes.get(
  "/categories",
  authenticateToken,
  authorizeRoles(["admin"]),
  (req, res) => categoryController.getAll(req, res)
);

adminRoutes.get(
  "/users",
  authenticateToken,
  authorizeRoles(["admin"]),
  (req, res) => userController.getUsers(req, res)
);

adminRoutes.get("/events", (req, res) =>
  listAllEventsController.listAllEvents(req, res)
);

adminRoutes.post("/login", (req, res) => userController.adminLogin(req, res));



// adminRoutes
//   .route("/categories/:id")
//   .post(authenticateToken, authorizeRoles(["admin"]), (req, res) => categoryController.edit(req, res))
//   .patch(authenticateToken, authorizeRoles(["admin"]), (req, res) => categoryController.listUnlist(req, res));

// adminRoutes
//   .route("/users")
//   .get(authenticateToken, authorizeRoles(["admin"]), (req, res) => userController.getUsers(req, res));

// adminRoutes
//   .route("/events")
//   .get((req, res) => listAllEventsController.listAllEvents(req, res));


export default adminRoutes;
