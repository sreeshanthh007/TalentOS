import { IPublicRepository } from "../interfaces/IPublicRepository";
import { CategoryModel, CreateCategoryData, UpdateCategoryData } from "../models/category.model";
import { supabaseClient } from "@shared/config/db.config";


export class PublicRepository implements IPublicRepository {

    async getAllCategories(): Promise<CategoryModel[]> {
        const { data, error } = await supabaseClient
            .from('job_categories')
            .select('*');

        if (error) {
            throw error;
        }

        return data as CategoryModel[];
    }

    // async getCategoryById(id: string): Promise<CategoryModel | null> {
    //     const { data, error } = await supabaseClient
    //         .from('categories')
    //         .select('*')
    //         .eq('id', id)
    //         .maybeSingle();

    //     if (error) {
    //         throw error;
    //     }

    //     return data as CategoryModel | null;
    // }

    // async createCategory(data: CreateCategoryData): Promise<CategoryModel> {
    //     const { data: category, error } = await supabaseClient
    //         .from('categories')
    //         .insert({
    //             name: data.name,
    //             icon: data.icon
    //         })
    //         .select()
    //         .single();

    //     if (error) {
    //         throw error;
    //     }

    //     return category as CategoryModel;
    // }

    // async updateCategory(id: string, data: Partial<UpdateCategoryData>): Promise<CategoryModel> {
    //     const { data: category, error } = await supabaseClient
    //         .from('categories')
    //         .update(data)
    //         .eq('id', id)
    //         .select()
    //         .single();

    //     if (error) {
    //         throw error;
    //     }

    //     return category as CategoryModel;
    // }

    // async deleteCategory(id: string): Promise<void> {
    //     const { error } = await supabaseClient
    //         .from('categories')
    //         .delete()
    //         .eq('id', id);

    //     if (error) {
    //         throw error;
    //     }
    // }
}