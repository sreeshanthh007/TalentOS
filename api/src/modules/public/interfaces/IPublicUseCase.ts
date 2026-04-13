import { CategoryModel } from "../models/category.model";
import { SubscriptionPlanModel, JobModel, EmployerProfileModel } from "@modules/employers/models/employer.model";
import { JobFiltersModel } from "../models/job.model";
import { ContactInquiryPayload } from "../dtos/public.dto";

export interface IPublicUseCase {
    getAllCategories(): Promise<CategoryModel[]>;
    getPlans(): Promise<SubscriptionPlanModel[]>;
    getJobs(filters: JobFiltersModel): Promise<{ data: JobModel[]; total: number }>;
    getFeaturedJobs(): Promise<JobModel[]>;
    getJobById(id: string): Promise<JobModel>;
    createInquiry(data: ContactInquiryPayload, employerId?: string): Promise<void>;
    getEmployerProfile(userId: string): Promise<EmployerProfileModel | null>;
    getTestimonials(): Promise<any[]>;
}
