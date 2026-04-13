import { IPublicRepository } from "../interfaces/IPublicRepository";
import { CategoryModel } from "../models/category.model";
import { IPublicUseCase } from "../interfaces/IPublicUseCase";
import { SubscriptionPlanModel, JobModel, EmployerProfileModel } from "@modules/employers/models/employer.model";
import { TestimonialModel } from "@modules/admin/models/admin.model";
import { JobFiltersModel } from "../models/job.model";
import { ContactInquiryPayload } from "../dtos/public.dto";
import { CustomError } from "@shared/utils/CustomError";
import { ERROR_MESSAGES } from "@shared/constants/messages.constants";
import { HTTP_STATUS } from "@shared/constants/statusCodes.constants";


export class PublicUseCase implements IPublicUseCase {

    constructor(
        private readonly publicRepository: IPublicRepository
    ) {}

    async getAllCategories(): Promise<CategoryModel[]> {
        return this.publicRepository.getAllCategories();
    }

    async getPlans(): Promise<SubscriptionPlanModel[]> {
        return this.publicRepository.getPlans();
    }

    async getJobs(filters: JobFiltersModel): Promise<{ data: JobModel[]; total: number }> {
        return this.publicRepository.getJobs(filters);
    }

    async getFeaturedJobs(): Promise<JobModel[]> {
        return this.publicRepository.getFeaturedJobs();
    }

    async getJobById(id: string): Promise<JobModel> {
        const job = await this.publicRepository.getJobById(id)
        if (!job) {
          throw new CustomError(ERROR_MESSAGES.NOT_FOUND, HTTP_STATUS.NOT_FOUND)
        }
        // Increment views_count
        await this.publicRepository.incrementJobViews(id)
        return job
    }

    async createInquiry(data: ContactInquiryPayload, userId?: string): Promise<void> {
        // Find plan id by name if plan_interested provided
        let planId: string | null = null;
        if (data.plan_interested) {
          const plan = await this.publicRepository.findPlanByName(data.plan_interested);
          planId = plan?.id || null;
        }

        // Link to employer if userId provided
        let employerId: string | null = null;
        if (userId) {
            const profile = await this.publicRepository.getEmployerProfileByUserId(userId);
            employerId = profile?.id || null;
        }
      
        await this.publicRepository.createInquiry({
          employer_id: employerId,
          plan_id: planId,
          subject: `Plan Inquiry: ${data.plan_interested || 'General'}`,
          initial_message: `Company: ${data.company_name}\nPhone: ${data.phone}\n\n${data.message}`,
        });
    }

    async getEmployerProfile(userId: string): Promise<EmployerProfileModel | null> {
        return this.publicRepository.getEmployerProfileByUserId(userId);
    }

    async getTestimonials(): Promise<TestimonialModel[]> {
        return this.publicRepository.getTestimonials();
    }
}
