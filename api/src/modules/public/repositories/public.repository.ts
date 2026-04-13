import { IPublicRepository } from "../interfaces/IPublicRepository";
import { CategoryModel } from "../models/category.model";
import { SubscriptionPlanModel, JobModel, EmployerProfileModel } from "@modules/employers/models/employer.model";
import { supabaseClient } from "@shared/config/db.config";
import { JobFiltersModel } from "../models/job.model";
import { CustomError } from "@shared/utils/CustomError";
import { ERROR_MESSAGES, MESSAGES } from "@shared/constants/messages.constants";
import { HTTP_STATUS } from "@shared/constants/statusCodes.constants";
import { CreateInquiryDTO } from "../dtos/public.dto";
import { InquiryModel } from "@modules/admin/models/admin.model";


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

    async getPlans(): Promise<SubscriptionPlanModel[]> {
        const { data, error } = await supabaseClient
            .from('subscription_plans')
            .select('*')
            .eq('is_active', true)
            .order('price_monthly', { ascending: true });

        if (error) {
            throw error;
        }

        return data as SubscriptionPlanModel[];
    }

    async getFeaturedJobs(): Promise<JobModel[]> {
        const { data, error } = await supabaseClient
          .from('jobs')
          .select(`
            *,
            employer:employer_profiles (
              company_name,
              company_logo_url,
              industry
            ),
            category:job_categories (
              name,
              icon
            )
          `)
          .eq('status', 'active')          
          .order('views_count', { ascending: false })  
          .limit(6)                         
      
        if (error) {
          throw new CustomError(
            ERROR_MESSAGES.SERVER_ERROR,
            HTTP_STATUS.INTERNAL_SERVER_ERROR
          )
        }
      
        return data as any[]
    }

    async getJobById(id: string): Promise<JobModel> {
        const { data, error } = await supabaseClient
            .from('jobs')
            .select(`
                *,
                employer:employer_profiles ( company_name, company_logo_url, industry, company_description, website, address ),
                category:job_categories ( name, icon )
            `)
            .eq('id', id)
            .eq('status', 'active')
            .single()

        if (error) {
            if (error.code === 'PGRST116') {
                throw new CustomError(MESSAGES.JOB.NOT_FOUND, HTTP_STATUS.NOT_FOUND)
            }
            throw new CustomError(ERROR_MESSAGES.SERVER_ERROR, HTTP_STATUS.INTERNAL_SERVER_ERROR)
        }

        return data as any
    }
      
    async getJobs(filters: JobFiltersModel): Promise<{ data: JobModel[]; total: number }> {
        let query = supabaseClient
          .from('jobs')
          .select(`
            *,
            employer:employer_profiles ( company_name, company_logo_url, industry ),
            category:job_categories ( name, icon )
          `, { count: 'exact' })
          .eq('status', 'active')   // ← always filter active only for public
      
        if (filters.search) {
          query = query.ilike('title', `%${filters.search}%`)
        }
        if (filters.job_type) {
          query = query.eq('job_type', filters.job_type)
        }
        if (filters.category_id) {
          query = query.eq('category_id', filters.category_id)
        }
        if (filters.source) {
          query = query.eq('source', filters.source)
        }
      
        const page = filters.page || 1
        const limit = filters.limit || 12
        const offset = (page - 1) * limit
      
        query = query.range(offset, offset + limit - 1)
      
        const { data, error, count } = await query
      
        if (error) {
          throw new CustomError(
            ERROR_MESSAGES.SERVER_ERROR,
            HTTP_STATUS.INTERNAL_SERVER_ERROR
          )
        }
      
        return {
          data: data as any[],
          total: count || 0
        }
    }

    async createInquiry(data: CreateInquiryDTO): Promise<InquiryModel> {
        const { data: inquiry, error } = await supabaseClient
          .from('inquiries')
          .insert({
            employer_id: data.employer_id || null,
            plan_id: data.plan_id || null,
            subject: data.subject,
            initial_message: data.initial_message,
            status: 'open'
          })
          .select()
          .single()
      
        if (error) {
          throw new CustomError(
            ERROR_MESSAGES.SERVER_ERROR,
            HTTP_STATUS.INTERNAL_SERVER_ERROR
          )
        }
      
        return inquiry as InquiryModel
    }

    async findPlanByName(name: string): Promise<SubscriptionPlanModel | null> {
        const { data, error } = await supabaseClient
          .from('subscription_plans')
          .select('*')
          .eq('name', name)
          .maybeSingle()

        if (error) {
            throw new CustomError(
                ERROR_MESSAGES.SERVER_ERROR,
                HTTP_STATUS.INTERNAL_SERVER_ERROR
            )
        }

        return data as SubscriptionPlanModel | null
    }

    async getEmployerProfileByUserId(userId: string): Promise<EmployerProfileModel | null> {
        const { data, error } = await supabaseClient
            .from('employer_profiles')
            .select('*')
            .eq('user_id', userId)
            .maybeSingle()

        if (error) {
            throw new CustomError(
                ERROR_MESSAGES.SERVER_ERROR,
                HTTP_STATUS.INTERNAL_SERVER_ERROR
            )
        }

        return data as EmployerProfileModel | null
    }

    async getTestimonials(): Promise<any[]> {
        const { data, error } = await supabaseClient
            .from('testimonials')
            .select('*')
            .eq('is_active', true)
            .order('created_at', { ascending: false })

        if (error) {
            throw new CustomError(ERROR_MESSAGES.SERVER_ERROR, HTTP_STATUS.INTERNAL_SERVER_ERROR)
        }

        return data
    }
}
