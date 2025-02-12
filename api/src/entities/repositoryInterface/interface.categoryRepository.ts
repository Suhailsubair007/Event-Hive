import { ICategory } from "../modelInterface/Category";

export interface ICategoryRepository {
  createCategory(category: ICategory): Promise<ICategory>;
  updateCategory(id: string, category: Partial<ICategory>): Promise<ICategory | null>;
  findByName(name: string): Promise<ICategory | null>;
}
