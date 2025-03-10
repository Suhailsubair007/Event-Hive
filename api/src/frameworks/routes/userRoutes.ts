import express from "express";
import {
  otpController,
  userController,
  loginController,
  verifyOtpController,
  userPreferenceController,
  googleController,
  refreshTokenController,
  updateUserPremiumStatusController,
  updateProfileController,
  fetchUserDetailsController
} from "../di/User/Auth.dependencyContainer";

const userRoutes = express.Router();

userRoutes.post("/register", (req, res) => userController.register(req, res));
userRoutes.post("/send-otp", (req, res) => otpController.sendOTP(req, res));
userRoutes.post("/login", (req, res) => loginController.login(req, res));
userRoutes.post("/verify_otp", (req, res) =>
  verifyOtpController.verifyOTP(req, res)
);
userRoutes.post("/prefrence", (req, res) =>
  userPreferenceController.updatePreference(req, res)
);

userRoutes.post("/google-login", (req, res) =>
  googleController.login(req, res)
);
userRoutes.post("/google-sigup", (req, res) =>
  googleController.signup(req, res)
);

userRoutes.post("/refresh", (req, res) =>
  refreshTokenController.refreshAccessToken(req, res)
);

userRoutes.patch("/users/:userId/premium", (req, res) => 
  updateUserPremiumStatusController.updatePremiumStatus(req, res)
);

userRoutes.patch("/users/:userId/profile", (req, res) =>
  updateProfileController.updateProfile(req, res)
);

userRoutes.get("/users", (req, res) =>
  fetchUserDetailsController.fetchUserDetails(req, res)
);


// userRoutes
//   .route("/register")
//   .post((req, res) => userController.register(req, res));

// userRoutes
//   .route("/send-otp")
//   .post((req, res) => otpController.sendOTP(req, res));

// userRoutes
//   .route("/login")
//   .post((req, res) => loginController.login(req, res));

// userRoutes
//   .route("/verify_otp")
//   .post((req, res) => verifyOtpController.verifyOTP(req, res));

// userRoutes
//   .route("/users/:userId")
//   .patch((req, res) => updateUserPremiumStatusController.updatePremiumStatus(req, res))
//   .patch((req, res) => updateProfileController.updateProfile(req, res));


export default userRoutes;
