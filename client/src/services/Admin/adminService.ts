import axiosInstance from "@/config/axiosInstence";

export interface AdminLoginData {
  email: string;
  password: string;
}

export const updateUserPreferences = async (data: AdminLoginData) => {
  const response = await axiosInstance.post("/admin/login", data);
  return response.data;
};
