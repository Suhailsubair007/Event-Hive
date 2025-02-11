import express from "express";
import { otpController, userController,loginController,verifyOtpController,userPreferenceController } from "../di/Auth.dependencyContainer";
import {categoryController} from '../../frameworks/di/Cathegory.dependencyContainer'

const router = express.Router();

router.post("/register", (req, res) => userController.register(req, res));
router.post("/send-otp", (req, res) => otpController.sendOTP(req, res));
router.post("/login", (req, res) => loginController.login(req, res));
router.post("/verify_otp", (req, res) => verifyOtpController.verifyOTP(req, res));
router.post("/prefrence", (req, res) => userPreferenceController.updatePreference(req, res));
router.post("/add-category", (req, res) => categoryController.add(req, res));




export default router;


