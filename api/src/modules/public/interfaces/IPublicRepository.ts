import { CategoryModel, CreateCategoryData, UpdateCategoryData } from "../models/category.model";


export interface IPublicRepository {

    getAllCategories(): Promise<CategoryModel[]>
    // getCategoryById(id: string): Promise<CategoryModel | null>
    // createCategory(data: CreateCategoryData): Promise<CategoryModel>
    // updateCategory(id: string, data: Partial<UpdateCategoryData>): Promise<CategoryModel>
    // deleteCategory(id: string): Promise<void>
}