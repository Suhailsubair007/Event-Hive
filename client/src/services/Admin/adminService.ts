import axiosInstance from "@/config/axiosInstence";

export interface AdminLoginData {
  email: string;
  password: string;
}

export const updateUserPreferences = async (data: AdminLoginData) => {
  const response = await axiosInstance.post("/admin/login", data);
  return response.data;
};

export const getUsers = async (isPremiumUser: boolean) => {
  const response = await axiosInstance.get("/admin/users", {
    params: { isPremiumUser: isPremiumUser.toString() },
  });
  console.log(response.data.users)
  return response.data.users;
};
