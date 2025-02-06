import express from "express";
import { UserController } from "../../interface-apdaters/controllers/users/UserController";
import { RegisterUser } from "../../use-cases/user/Auth/RegisterUser";
import { UserRepository } from "../../interface-apdaters/repositories/Auth/UserRegister.repository"

const router = express.Router();

const userRepository = new UserRepository();
const registerUser = new RegisterUser(userRepository);
const userController = new UserController(registerUser);

router.post("/register", (req, res) => userController.register(req, res));

export default router;
