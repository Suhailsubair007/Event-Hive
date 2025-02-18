import express from "express";
import { categoryController } from "../di/Admin/Cathegory.dependencyContainer";
import { userController } from "../di/Admin/User.dependencyContainer";

const adminRoutes = express.Router();

adminRoutes.post("/categories", (req, res) => categoryController.add(req, res));
adminRoutes.post("/categories/:id", (req, res) =>
  categoryController.edit(req, res)
);
adminRoutes.patch("/categories/:id/list", (req, res) =>
  categoryController.listUnlist(req, res)
);
adminRoutes.get("/categories", (req, res) =>
  categoryController.getAll(req, res)
);

adminRoutes.get("/users", (req, res) => userController.getUsers(req, res));

adminRoutes.post("/login", (req, res) => userController.adminLogin(req, res));

export default adminRoutes;
