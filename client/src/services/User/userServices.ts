import axiosInstance from "@/config/axiosInstence";

export interface UpdatePremiumStatusData {
    id: string;
  }
  
  export const updateUserPremiumStatus = async (data: UpdatePremiumStatusData) => {
    const response = await axiosInstance.patch(`/users/${data.id}/premium`);
    return response.data;
  };
  