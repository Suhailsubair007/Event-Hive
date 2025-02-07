import express from "express";
import { otpController, userController,loginController } from "../di/Auth.dependencyContainer";

const router = express.Router();

router.post("/register", (req, res) => userController.register(req, res));
router.post("/send-otp", (req, res) => otpController.sendOTP(req, res));
router.post("/login", (req, res) => loginController.login(req, res));

export default router;
