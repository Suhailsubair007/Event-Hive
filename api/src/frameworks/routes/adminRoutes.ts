import express from "express";
import { categoryController } from "../di/Admin/Cathegory.dependencyContainer";
import { userController } from "../di/Admin/User.dependencyContainer";
import {
  authenticateToken,
  authorizeRoles,
} from "../../interface-apdaters/middleware/auth";

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

adminRoutes.post("/login", (req, res) => userController.adminLogin(req, res));

export default adminRoutes;
