import axiosInstance from "@/config/axiosInstence";

export interface SignupData {
  email: string;
}

export const sendOtp = async ({ email }: { email: string }) => {
    const response = await axiosInstance.post("/auth/send-otp", { email });
    return response.data;
  };
  