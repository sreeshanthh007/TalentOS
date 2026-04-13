import { IAdminRepository } from '../interfaces/IAdminRepository'
import { 
  AdminCandidateModel, 
  AdminEmployerModel, 
  AdminStatsModel, 
  InquiryModel, 
  MessageModel,
  TestimonialModel
} from '../models/admin.model'
import { 
  UpdatePlanDTO, 
  SendMessageDTO,
  CreateTestimonialDTO
} from '../dtos/admin.dto'
import { SubscriptionPlanModel } from '@modules/employers/models/employer.model'
import { supabaseClient as supabase } from '@shared/config/db.config'
import { SupabaseClient } from '@supabase/supabase-js'
import { CustomError } from '@shared/utils/CustomError'
import { HTTP_STATUS } from '@shared/constants/statusCodes.constants'
import { ERROR_MESSAGES } from '@shared/constants/messages.constants'

export class AdminRepository implements IAdminRepository {
  private readonly supabase: SupabaseClient = supabase

  async getStats(): Promise<AdminStatsModel> {
    // Count Employers
    const { count: total_employers, error: err1 } = await this.supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
      .eq('role', 'employer')

    // Count Candidates
    const { count: total_candidates, error: err2 } = await this.supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
      .eq('role', 'candidate')

    // Count Jobs
    const { count: total_jobs, error: err3 } = await this.supabase
      .from('jobs')
      .select('*', { count: 'exact', head: true })

    // Latest Jobs
    const { data: latest_jobs, error: err4 } = await this.supabase
      .from('jobs')
      .select(`
        *,
        employer:employer_profiles(company_name, company_logo_url, industry)
      `)
      .order('created_at', { ascending: false })
      .limit(6)

    if (err1 || err2 || err3 || err4) {
      throw new CustomError('Failed to fetch admin stats', HTTP_STATUS.INTERNAL_SERVER_ERROR)
    }

    return {
      total_employers: total_employers || 0,
      total_candidates: total_candidates || 0,
      total_jobs: total_jobs || 0,
      latest_jobs: latest_jobs || []
    }
  }

  async getEmployers(params: { 
    search?: string; 
    verification_status?: string; 
    page: number; 
    limit: number 
  }): Promise<{ data: AdminEmployerModel[]; total: number }> {
    const offset = (params.page - 1) * params.limit
    
    let query = this.supabase
      .from('employer_profiles')
      .select(`
        *,
        user:users(email, is_blocked),
        documents:employer_documents(*),
        subscription:employer_subscriptions(
          status,
          plan:subscription_plans(name)
        )
      `, { count: 'exact' })

    if (params.search) {
      query = query.or(`company_name.ilike.%${params.search}%`)
    }

    if (params.verification_status) {
      query = query.eq('verification_status', params.verification_status)
    }

    const { data, count, error } = await query
      .range(offset, offset + params.limit - 1)
      .order('created_at', { ascending: false })

    if (error) throw new CustomError(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)

    const mapped = data.map((emp: any) => ({
      ...emp,
      email: emp.user.email,
      is_blocked: emp.user.is_blocked,
      subscription: emp.subscription ? {
        plan_name: emp.subscription.plan.name,
        status: emp.subscription.status
      } : null
    }))

    return {
      data: mapped,
      total: count || 0
    }
  }

  async getEmployerById(employerId: string): Promise<AdminEmployerModel | null> {
    const { data, error } = await this.supabase
      .from('employer_profiles')
      .select(`
        *,
        user:users(email, is_blocked),
        documents:employer_documents(*),
        subscription:employer_subscriptions(
          status,
          plan:subscription_plans(name)
        )
      `)
      .eq('id', employerId)
      .single()

    if (error && error.code !== 'PGRST116') throw new CustomError(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
    if (!data) return null

    return {
      ...data,
      email: data.user.email,
      is_blocked: data.user.is_blocked,
      subscription: data.subscription ? {
        plan_name: data.subscription.plan.name,
        status: data.subscription.status
      } : null
    }
  }

  async deleteEmployer(employerId: string): Promise<void> {
    // cascades should handle cleanup if configured in DB, else manual cleanup here
    const { error } = await this.supabase
      .from('employer_profiles')
      .delete()
      .eq('id', employerId)

    if (error) throw new CustomError(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
  }

  async updateVerificationStatus(employerId: string, status: string): Promise<void> {
    const { error } = await this.supabase
      .from('employer_profiles')
      .update({ verification_status: status })
      .eq('id', employerId)

    if (error) throw new CustomError(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
  }

  async getCandidates(params: { 
    search?: string; 
    page: number; 
    limit: number 
  }): Promise<{ data: AdminCandidateModel[]; total: number }> {
    const offset = (params.page - 1) * params.limit

    let query = this.supabase
      .from('candidate_profiles')
      .select(`
        *,
        user:users(email, is_blocked)
      `, { count: 'exact' })

    if (params.search) {
      query = query.or(`full_name.ilike.%${params.search}%`)
    }

    const { data, count, error } = await query
      .range(offset, offset + params.limit - 1)
      .order('created_at', { ascending: false })

    if (error) throw new CustomError(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)

    const mapped = data.map((can: any) => ({
      ...can,
      email: can.user.email,
      is_blocked: can.user.is_blocked,
      average_rating: 0 // Ideally calculate from applications
    }))

    return {
      data: mapped,
      total: count || 0
    }
  }

  async deleteCandidate(candidateId: string): Promise<void> {
    const { error } = await this.supabase
      .from('candidate_profiles')
      .delete()
      .eq('id', candidateId)

    if (error) throw new CustomError(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
  }

  async blockUser(userId: string, isBlocked: boolean): Promise<void> {
    const { error } = await this.supabase
      .from('users')
      .update({ is_blocked: isBlocked })
      .eq('id', userId)

    if (error) throw new CustomError(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
  }

  async getPlans(): Promise<SubscriptionPlanModel[]> {
  const { data, error } = await this.supabase
    .from('subscription_plans')
    .select(`
      id,
      name,
      display_name,
      price_monthly,
      job_listing_limit,
      features,
      is_active,
      created_at,
      updated_at
    `)
    .eq('is_active', true)
    .order('price_monthly', { ascending: true })

  if (error) {
    throw new CustomError(
      ERROR_MESSAGES.SERVER_ERROR, 
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    )
  }
    return data as SubscriptionPlanModel[]
  }

async updatePlan(planId: string, data: UpdatePlanDTO): Promise<SubscriptionPlanModel> {
  const updatePayload: Record<string, unknown> = {}
  
  if (data.price_monthly !== undefined) {
    updatePayload.price_monthly = data.price_monthly
  }
  if (data.features !== undefined) {
    updatePayload.features = data.features
  }
  if (data.display_name !== undefined) {
    updatePayload.display_name = data.display_name
  }

  const { data: updated, error } = await this.supabase
    .from('subscription_plans')
    .update(updatePayload)
    .eq('id', planId)
    .select()
    .single()

  if (error) {
    throw new CustomError(
      ERROR_MESSAGES.SERVER_ERROR,
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    )
  }

  return updated as SubscriptionPlanModel
}

  async getInquiries(): Promise<InquiryModel[]> {
    const { data, error } = await this.supabase
      .from('inquiries')
      .select(`
        *,
        employer:employer_profiles(
          company_name, 
          industry,
          user:users(email)
        ),
        plan:subscription_plans(display_name)
      `)
      .order('created_at', { ascending: false })

    if (error) throw new CustomError(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)

    return (data as any[]).map(inq => ({
      ...inq,
      employer: inq.employer ? {
        company_name: inq.employer.company_name,
        industry: inq.employer.industry,
        email: inq.employer.user?.email || ''
      } : null
    }))
  }

  async updateInquiryStatus(inquiryId: string, status: string): Promise<void> {
    const { error } = await this.supabase
      .from('inquiries')
      .update({ status })
      .eq('id', inquiryId)

    if (error) throw new CustomError(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
  }

  async getMessages(inquiryId: string): Promise<MessageModel[]> {
    const { data, error } = await this.supabase
      .from('messages')
      .select('*')
      .eq('inquiry_id', inquiryId)
      .order('sent_at', { ascending: true })

    if (error) throw new CustomError(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
    return data
  }

  async sendMessage(
    senderId: string, 
    data: SendMessageDTO, 
    senderRole: 'admin' | 'employer'
  ): Promise<MessageModel> {
    const { data: inserted, error } = await this.supabase
      .from('messages')
      .insert({
        inquiry_id: data.inquiry_id,
        sender_id: senderId,
        sender_role: senderRole,
        content: data.content
      })
      .select()
      .single()

    if (error) throw new CustomError(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)

    // Update inquiry to in_progress if currently open
    await this.supabase
      .from('inquiries')
      .update({ status: 'in_progress', updated_at: new Date().toISOString() })
      .eq('id', data.inquiry_id)
      .eq('status', 'open')

    return inserted
  }

  // Testimonials
  async getTestimonials(): Promise<TestimonialModel[]> {
    const { data, error } = await this.supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      throw new CustomError(ERROR_MESSAGES.SERVER_ERROR, HTTP_STATUS.INTERNAL_SERVER_ERROR)
    }

    return data as TestimonialModel[]
  }

  async createTestimonial(data: CreateTestimonialDTO): Promise<TestimonialModel> {
    const { data: testimonial, error } = await this.supabase
      .from('testimonials')
      .insert({
        author_name: data.author_name,
        author_role: data.author_role || null,
        content: data.content,
        rating: data.rating,
        is_active: data.is_active ?? true,
        avatar_url: data.avatar_url || null
      })
      .select()
      .single()

    if (error) {
      throw new CustomError(ERROR_MESSAGES.SERVER_ERROR, HTTP_STATUS.INTERNAL_SERVER_ERROR)
    }

    return testimonial as TestimonialModel
  }

  async updateTestimonial(
    id: string, 
    data: Partial<CreateTestimonialDTO>
  ): Promise<TestimonialModel> {
    const { data: testimonial, error } = await this.supabase
      .from('testimonials')
      .update(data)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      throw new CustomError(ERROR_MESSAGES.SERVER_ERROR, HTTP_STATUS.INTERNAL_SERVER_ERROR)
    }

    return testimonial as TestimonialModel
  }

  async deleteTestimonial(id: string): Promise<void> {
    const { error } = await this.supabase
      .from('testimonials')
      .delete()
      .eq('id', id)

    if (error) {
      throw new CustomError(ERROR_MESSAGES.SERVER_ERROR, HTTP_STATUS.INTERNAL_SERVER_ERROR)
    }
  }

  async toggleTestimonialStatus(id: string, isActive: boolean): Promise<void> {
    const { error } = await this.supabase
      .from('testimonials')
      .update({ is_active: isActive })
      .eq('id', id)

    if (error) {
      throw new CustomError(ERROR_MESSAGES.SERVER_ERROR, HTTP_STATUS.INTERNAL_SERVER_ERROR)
    }
  }
}
