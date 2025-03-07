import { ICategoryRepository } from "../../../entities/repositoryInterface/Admin/interface.categoryRepository";
import { CustomError } from "../../../shared/utils/CustomError";
import {ICategory} from '../../../entities/modelInterface/Category'

export class ListCategory {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(id: string, isListed: boolean): Promise<ICategory> {
    if (!id) {
      throw new CustomError("Category ID is required", 400);
    }

    const updatedCategory = await this.categoryRepository.listCategory(id, isListed);
    if (!updatedCategory) {
      throw new CustomError("Category not found", 404);
    }

    return updatedCategory;
  }
}