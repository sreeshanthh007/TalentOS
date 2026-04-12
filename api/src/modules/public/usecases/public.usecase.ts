import { IPublicRepository } from "../interfaces/IPublicRepository";
import { CategoryModel } from "../models/category.model";


export class PublicUseCase {

    constructor(
        private readonly publicRepository: IPublicRepository
    ) {}

    async getAllCategories(): Promise<CategoryModel[]> {
        return this.publicRepository.getAllCategories();
    }

    async getPlans() {
        return this.publicRepository.getPlans();
    }
}
