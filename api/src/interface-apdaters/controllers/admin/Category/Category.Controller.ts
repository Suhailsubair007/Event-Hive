import { Request, Response } from "express";
import { AddCategory } from "../../../../use-cases/admin/category/AddCategory";
import { ICategory } from "../../../../entities/modelInterface/Category";
import { EditCategory } from "../../../../use-cases/admin/category/EditCtegory";
import { ListCategory } from "../../../../use-cases/admin/category/ListCategory";
import { GetAllCategories } from "../../../../use-cases/admin/category/GetAllCategories";

export class CategoryContoller {
  constructor(
    private addCategory: AddCategory,
    private editCategory: EditCategory,
    private listCategory: ListCategory,
    private getAllCategories: GetAllCategories
  ) {}

  async add(req: Request, res: Response): Promise<void> {
    try {
      const { name, description, imageUrl } = req.body;
      const category: ICategory = {
        name,
        description,
        imageUrl,
        isListed: true,
      };

      const newCategory = await this.addCategory.execute(category);
      res.status(201).json({
        success: true,
        category: newCategory,
      });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        success: false,
        messgae: error.message,
      });
    }
  }

  async edit(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { name, description, imageUrl } = req.body;

      const updatedCategory = await this.editCategory.execute(id, {
        name,
        description,
        imageUrl,
      });
      res.status(200).json({ success: true, category: updatedCategory });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async listUnlist(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { isListed } = req.body;

      const updatedCategory = await this.listCategory.execute(id, isListed);
      res.status(200).json({ success: true, category: updatedCategory });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const { page, limit } = req.query;

      const pageNumber = parseInt(page as string) || 1; 
      const limitNumber = parseInt(limit as string) || 10;

      const categories = await this.getAllCategories.execute(pageNumber, limitNumber);
      res.status(200).json({ success: true, categories });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message,
      });
    }
  }
}
