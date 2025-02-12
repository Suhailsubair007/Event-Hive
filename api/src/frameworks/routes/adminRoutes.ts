import express from "express";
import { categoryController } from "../../frameworks/di/Cathegory.dependencyContainer";

const adminRoutes = express.Router();

adminRoutes.post("/categories", (req, res) => categoryController.add(req, res));
adminRoutes.post("/categories/:id", (req, res) =>
  categoryController.edit(req, res)
);
adminRoutes.post("/categories/:id/list", (req, res) =>
  categoryController.listUnlist(req, res)
);
adminRoutes.get("/categories", (req, res) =>
  categoryController.getAll(req, res)
);

export default adminRoutes;
