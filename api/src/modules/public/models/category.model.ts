

export interface CategoryModel{
    id: string;
    name: string;
    icon:string
    created_at: string;
    updated_at: string;
}

export interface CreateCategoryData {
    name: string;
    icon:string
}

export interface UpdateCategoryData {
    name?: string;
    icon?:string
}