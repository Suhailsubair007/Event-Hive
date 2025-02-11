import { ICategoryRepository } from "../../../../entities/repositoryInterface/interface.categoryRepository";
import { ICategory } from "../../../../entities/modelInterface/Category";
import { CategoryModel } from "../../../../frameworks/databaseModels/Category";

export class categoryRepository implements ICategoryRepository {
  async createCategory(category: ICategory): Promise<ICategory> {
    const newCategory = new CategoryModel(category);
    await newCategory.save();
    return newCategory;
  }
  async updateCategory(
    id: string,
    category: Partial<ICategory>
  ): Promise<ICategory | null> {
    return CategoryModel.findByIdAndUpdate(id, category, { new: true });
  }
}
