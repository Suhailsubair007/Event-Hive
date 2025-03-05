import adminAxiosInstance from "@/config/adminAxiosInstance";

export interface CategoryData {
  _id?: string;
  name: string;
  description: string;
  imageUrl: string;
  isListed?: boolean;
}

export const categoryService = {
  getAllCategories: async (page: number = 1, limit: number = 5) => {
    const response = await adminAxiosInstance.get(
      `/admin/categories?page=${page}&limit=${limit}`
    );
    return response.data;
  },

  addCategory: async (categoryData: CategoryData) => {
    const response = await adminAxiosInstance.post('/admin/categories', categoryData);
    return response.data;
  },

  editCategory: async (id: string, categoryData: CategoryData) => {
    const response = await adminAxiosInstance.post(
      `/admin/categories/${id}`,
      categoryData
    );
    return response.data;
  },

  toggleCategoryStatus: async (id: string, isListed: boolean) => {
    const response = await adminAxiosInstance.patch(`/admin/categories/${id}/list`, {
      isListed,
    });
    return response.data;
  },
};
