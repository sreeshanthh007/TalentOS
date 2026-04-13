import { CategoryModel } from "../models/category.model";
import { SubscriptionPlanModel, JobModel, EmployerProfileModel } from "@modules/employers/models/employer.model";
import { JobFiltersModel } from "../models/job.model";
import { InquiryModel } from "@modules/admin/models/admin.model";
import { CreateInquiryDTO } from "../dtos/public.dto";


export interface IPublicRepository {
    getAllCategories(): Promise<CategoryModel[]>
    getPlans(): Promise<SubscriptionPlanModel[]>
    getJobs(filters: JobFiltersModel): Promise<{ data: JobModel[]; total: number }>
    getFeaturedJobs(): Promise<JobModel[]>
    getJobById(id: string): Promise<JobModel>
    createInquiry(data: CreateInquiryDTO): Promise<InquiryModel>
    findPlanByName(name: string): Promise<SubscriptionPlanModel | null>
    getEmployerProfileByUserId(userId: string): Promise<EmployerProfileModel | null>
    getTestimonials(): Promise<any[]>
}
