// src/infrastructure/database/models/CategoryModel.ts
import { Schema, model, Document } from "mongoose";
import { ICategory } from "../../entities/modelInterface/Category";

export interface CategoryDocument extends ICategory, Document {}

const CategorySchema = new Schema<CategoryDocument>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  isListed: { type: Boolean, default: true },
});

export const CategoryModel = model<CategoryDocument>(
  "Category",
  CategorySchema
);
