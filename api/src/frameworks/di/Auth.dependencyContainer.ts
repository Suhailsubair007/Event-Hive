// src/di/dependencyContainer.ts
import { UserController } from "../../interface-apdaters/controllers/users/AuthController/UserController";
import { RegisterUser } from "../../use-cases/user/Auth/RegisterUser";
import { UserRepository } from "../../interface-apdaters/repositories/User/Auth/UserRegister.repository";
import { OTPRepository } from "../../interface-apdaters/repositories/User/Auth/otp.repository";
import { SendOTP } from "../../use-cases/user/Auth/sendOtp";
import { OTPController } from "../../interface-apdaters/controllers/users/AuthController/otp.controller";
import { LoginController } from "../../interface-apdaters/controllers/users/AuthController/login.controller";
import { LoginUser } from "../../use-cases/user/Auth/loginUser";
import { LoginRepository } from "../../interface-apdaters/repositories/User/Auth/login.repository";
import { VerifyOtp } from "../../use-cases/user/Auth/verifyOtp";
import { VerifyOtpController } from "../../interface-apdaters/controllers/users/AuthController/verifyOtp.controller";
import { OTPrepository } from "../../interface-apdaters/repositories/User/Auth/verifyOtp.repository";

// Instantiate repositories
const userRepository = new UserRepository();
const otpRepository = new OTPRepository();

// Instantiate use cases
const registerUser = new RegisterUser(userRepository);
const sendOTPUseCase = new SendOTP(otpRepository);

// Instantiate controllers
const userController = new UserController(registerUser);
const otpController = new OTPController(sendOTPUseCase);

// Instantiate login repository
const loginRepository = new LoginRepository();
const loginUser = new LoginUser(loginRepository);
const loginController = new LoginController(loginUser);

// Instantiate verify otp repository
const verifyOtpRepository = new OTPrepository();
const verifyOtp = new VerifyOtp(verifyOtpRepository);
const verifyOtpController = new VerifyOtpController(verifyOtp);

export { userController, otpController, loginController, verifyOtpController };
