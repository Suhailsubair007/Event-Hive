import { ICategoryRepository } from "../../../../entities/repositoryInterface/interface.categoryRepository";
import { ICategory } from "../../../../entities/modelInterface/Category";
import { CategoryModel } from "../../../../frameworks/databaseModels/Category";
import { CustomError } from "../../../../shared/utils/CustomError";

export class categoryRepository implements ICategoryRepository {
  async createCategory(category: ICategory): Promise<ICategory> {
    const existingCategory = await CategoryModel.findOne({
      name: category.name,
    });
    if (existingCategory) {
      throw new CustomError("Category with the same name already exist", 400);
    }
    const newCategory = new CategoryModel(category);
    await newCategory.save();
    return newCategory;
  }
  async updateCategory(
    id: string,
    category: Partial<ICategory>
  ): Promise<ICategory | null> {
    if (category.name) {
      const existingCategory = await CategoryModel.findOne({
        name: category.name,
        _id: { $ne: id },
      });
      if (existingCategory) {
        throw new CustomError("Category with this name already exists", 400);
      }
    }
    return CategoryModel.findByIdAndUpdate(id, category, { new: true });
  }

  async findByName(name: string): Promise<ICategory | null> {
    return CategoryModel.findOne({ name });
  }

  async listCategory(id: string, isListed: boolean): Promise<ICategory | null> {
    return CategoryModel.findByIdAndUpdate(id, { isListed }, { new: true });
  }

  async findAllCategories(): Promise<ICategory[]> {
    return CategoryModel.find();
  }
}
