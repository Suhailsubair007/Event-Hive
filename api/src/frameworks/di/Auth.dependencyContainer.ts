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

export { userController, otpController, loginController };
