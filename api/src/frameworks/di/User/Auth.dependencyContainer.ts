import { UserController } from "../../../interface-apdaters/controllers/users/AuthController/UserController";
import { RegisterUser } from "../../../use-cases/user/Auth/RegisterUser";
import { UserRepository } from "../../../interface-apdaters/repositories/User/Auth/UserRegister.repository";
import { OTPRepository } from "../../../interface-apdaters/repositories/User/Auth/otp.repository";
import { SendOTP } from "../../../use-cases/user/Auth/sendOtp";
import { OTPController } from "../../../interface-apdaters/controllers/users/AuthController/otp.controller";
import { LoginController } from "../../../interface-apdaters/controllers/users/AuthController/login.controller";
import { LoginUser } from "../../../use-cases/user/Auth/loginUser";
import { LoginRepository } from "../../../interface-apdaters/repositories/User/Auth/login.repository";
import { VerifyOtp } from "../../../use-cases/user/Auth/verifyOtp";
import { VerifyOtpController } from "../../../interface-apdaters/controllers/users/AuthController/verifyOtp.controller";
import { OTPrepository } from "../../../interface-apdaters/repositories/User/Auth/verifyOtp.repository";
import { updateUserPreference } from "../../../use-cases/user/Auth/userPreference";
import { UserPreferenceRepository } from "../../../interface-apdaters/repositories/User/Auth/UpdateUserPreference.repository";
import { UserPreferenceController } from "../../../interface-apdaters/controllers/users/AuthController/userPreference.controller";
import { GoogleSignUp } from "../../../use-cases/user/Auth/GoogleSignup";
import { GoogleLogin } from "../../../use-cases/user/Auth/GoogleLogin";
import { GoogleController } from "../../../interface-apdaters/controllers/users/AuthController/google.controller";
import { RefreshTokenController } from "../../../interface-apdaters/controllers/users/AuthController/refreshTocken.controller";
import { GoogleAuthRepository } from "../../../interface-apdaters/repositories/User/Auth/google.repository";
import { UpdateUserRepository } from "../../../interface-apdaters/repositories/User/Auth/updatePremiumUser.repository";
import { UpdateUserPremiumStatus } from "../../../use-cases/user/Auth/UpdateUserPremiumStatus";
import { UpdateUserPremiumStatusController } from "../../../interface-apdaters/controllers/users/AuthController/updatePremiumStatusController";
import { UpdateProfile } from "../../../use-cases/user/User/updateProfile";
import { UpdateProfileController } from "../../../interface-apdaters/controllers/users/updateProfileController";
import { FetchUserDetails } from "../../../use-cases/user/User/getProfileDetails";
import { FetchUserDetailsController } from "../../../interface-apdaters/controllers/users/FetchUserDetailsController";
import { updateProfileRepository } from "../../../interface-apdaters/repositories/User/updateProfileREpository";

// Instantiate repositories
const userRepository = new UserRepository();
const otpRepository = new OTPRepository();
const updateProfileREpository = new updateProfileRepository();

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

// Instantiate user preference repository
const userPreferenceRepository = new UserPreferenceRepository();
const updateUserPreferenceUseCase = new updateUserPreference(
  userPreferenceRepository
);
const userPreferenceController = new UserPreferenceController(
  updateUserPreferenceUseCase
);

const googleAuthRepository = new GoogleAuthRepository(); // Add this line
const googleSignUpUseCase = new GoogleSignUp(googleAuthRepository);
const googleLoginUseCase = new GoogleLogin(googleAuthRepository);

const googleController = new GoogleController(
  googleLoginUseCase,
  googleSignUpUseCase
);

const updateUserRepository = new UpdateUserRepository();
const updateUserPremiumStatusUseCase = new UpdateUserPremiumStatus(
  updateUserRepository
);
const updateUserPremiumStatusController = new UpdateUserPremiumStatusController(
  updateUserPremiumStatusUseCase
);

const updateProfile = new UpdateProfile(updateProfileREpository);
const updateProfileController = new UpdateProfileController(updateProfile);

const fetchUserDetails = new FetchUserDetails(userRepository);
const fetchUserDetailsController = new FetchUserDetailsController(
  fetchUserDetails
);

const refreshTokenController = new RefreshTokenController();
export {
  userController,
  otpController,
  loginController,
  verifyOtpController,
  userPreferenceController,
  googleController,
  refreshTokenController,
  updateUserPremiumStatusController,
  updateProfileController,
  fetchUserDetailsController,
};
