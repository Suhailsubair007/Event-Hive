import axiosInstance from "@/config/axiosInstence";

export interface SignupData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export const sendOtp = async ({ email }: { email: string }) => {
  const response = await axiosInstance.post("/auth/send-otp", { email });
  return response.data;
};

export const verifyOtp = async ({ email, otp }: { email: string; otp: string }) => {
  const response = await axiosInstance.post("/auth/verify_otp", { email, otp });
  return response.data;
};

export const registerUser = async (data: SignupData) => {
  const response = await axiosInstance.post("/auth/register", data);
  return response.data;
};
