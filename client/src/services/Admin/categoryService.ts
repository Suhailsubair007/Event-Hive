import axiosInstance from "@/config/axiosInstence";

export interface CategoryData {
  _id?: string;
  name: string;
  description: string;
  imageUrl: string;
  isListed?: boolean;
}

export const categoryService = {
  getAllCategories: async () => {
    const response = await axiosInstance.get(`/admin/categories`);
    return response.data;
  },

  addCategory: async (categoryData: CategoryData) => {
    const response = await axiosInstance.post(`$/categories`, categoryData);
    return response.data;
  },

  editCategory: async (id: string, categoryData: CategoryData) => {
    const response = await axiosInstance.put(
      `$/categories/${id}`,
      categoryData
    );
    return response.data;
  },

  toggleCategoryStatus: async (id: string, isListed: boolean) => {
    const response = await axiosInstance.patch(`/admin/categories/${id}/list`, {
      isListed,
    });
    return response.data;
  },
};
