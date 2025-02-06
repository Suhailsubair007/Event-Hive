import express from "express";
import { UserController } from "../../interface-apdaters/controllers/users/UserController";
import { RegisterUser } from "../../use-cases/user/Auth/RegisterUser";
import { UserRepository } from "../../interface-apdaters/repositories/Auth/UserRegister.repository";
import { OTPRepository } from "../../interface-apdaters/repositories/Auth/otp.repository";
import { SendOTP } from "../../use-cases/user/Auth/sendOtp";
import { OTPController } from "../../interface-apdaters/controllers/users/otp.controller";

const router = express.Router();

const userRepository = new UserRepository();
const otpRepository = new OTPRepository();

const registerUser = new RegisterUser(userRepository);
const sendOTPUseCase = new SendOTP(otpRepository);

const userController = new UserController(registerUser);
const otpController = new OTPController(sendOTPUseCase);

router.post("/register", (req, res) => userController.register(req, res));
router.post("/send-otp", (req, res) => otpController.sendOTP(req, res));

export default router;
