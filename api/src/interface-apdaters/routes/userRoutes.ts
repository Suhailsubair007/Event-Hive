// src/interface-adapters/routes/userRoutes.ts
import express from "express";
import { UserController } from "../../interface-apdaters/controllers/users/UserController";
import { RegisterUser } from "../../use-cases/user/Auth/RegisterUser";

const router = express.Router();
const registerUser = new RegisterUser();
const userController = new UserController(registerUser);

router.post("/register", (req, res) => userController.register(req, res));

export default router;