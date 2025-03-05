import axiosInstance from "@/config/axiosInstence";

interface UserData {
  _id: string;
  name: string;
  email: string;
  password?: string;
  phone: string;
  isPremiumUser: boolean;
  gender: string;
  country: string;
  nickname: string;
  profileImage?: string;
}
export interface UpdatePremiumStatusData {
  id: string;
}

export const updateUserPremiumStatus = async (
  data: UpdatePremiumStatusData
) => {
  const response = await axiosInstance.patch(`/users/${data.id}/premium`);
  return response.data;
};

export const getUpdateProfileDetails = async (email: string) => {
  const response = await axiosInstance.get("/auth/users", {
    params: { email },
  });
  console.log(response.data);
  return response.data.user;
};

export const updateProfile = async (
  userId: string,
  updates: Partial<UserData>
) => {
  const response = await axiosInstance.patch(
    `/auth/users/${userId}/profile`,
    updates
  );
  return response.data;
};
