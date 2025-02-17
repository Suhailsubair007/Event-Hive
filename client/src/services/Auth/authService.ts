import axiosInstance from "@/config/axiosInstence";



export interface SignupData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface GoogleLoginData {
  name: string;
  email: string;
  sub: string;
}

export const sendOtp = async ({ email }: { email: string }) => {
  const response = await axiosInstance.post("/auth/send-otp", { email });
  return response.data;
};

export const verifyOtp = async ({
  email,
  otp,
}: {
  email: string;
  otp: string;
}) => {
  const response = await axiosInstance.post("/auth/verify_otp", { email, otp });
  return response.data;
};

export const registerUser = async (data: SignupData) => {
  const response = await axiosInstance.post("/auth/register", data);
  return response.data;
};

export const LoginUser = async (data: LoginData) => {
  const response = await axiosInstance.post("/auth/login", data);
  return response.data;
};

export const googleLogin = async (data: GoogleLoginData) => {
  const response = await axiosInstance.post("/auth/google-login", data);
  return response.data;
};

export const googleSignup = async (data: GoogleLoginData) => {
  const response = await axiosInstance.post("/auth/google-sigup", data);
  return response.data;
};