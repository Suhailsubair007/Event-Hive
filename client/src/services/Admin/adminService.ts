import adminAxiosInstance from "@/config/adminAxiosInstance";
export interface AdminLoginData {
  email: string;
  password: string;
}

export const updateUserPreferences = async (data: AdminLoginData) => {
  const response = await adminAxiosInstance.post("/admin/login", data);
  return response.data;
};

export const getUsers = async (isPremiumUser: boolean, page: number = 1, limit: number = 10) => {
  const response = await adminAxiosInstance.get(
    `/admin/users?isPremiumUser=${isPremiumUser}&page=${page}&limit=${limit}`
  );
  return response.data;
};
