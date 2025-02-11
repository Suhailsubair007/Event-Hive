import {ICategoryRepository} from '../../../entities/repositoryInterface/interface.categoryRepository'
import {CustomError} from '../../../shared/utils/CustomError'
import {ICategory} from '../../../entities/modelInterface/Category'

export class EditCategory {
    constructor(private categoryRepository: ICategoryRepository) {}
  
    async execute(id: string, category: Partial<ICategory>): Promise<ICategory> {
      if (!id) {
        throw new CustomError("Category ID is required", 400);
      }
  
      const updatedCategory = await this.categoryRepository.updateCategory(id, category);
      if (!updatedCategory) {
        throw new CustomError("Category not found", 404);
      }
  
      return updatedCategory;
    }
  }
