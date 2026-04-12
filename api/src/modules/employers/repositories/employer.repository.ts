import { IEmployerRepository } from '@modules/employers/interfaces/IEmployerRepository'
import { EmployerProfileModel, JobModel, ApplicationModel, EmployerDocumentModel } from '@modules/employers/models/employer.model'
import { CreateJobDTO, UpdateJobDTO, UpdateApplicationStatusDTO, UpdateEmployerProfileDTO, UploadDocumentDTO } from '@modules/employers/dtos/employer.dto'
import { EmployerStats, EmployerSubscription } from '@modules/employers/interfaces/employer.types'
import { CustomError } from '@shared/utils/CustomError'
import { HTTP_STATUS } from '@shared/constants/statusCodes.constants'
import { SupabaseClient } from '@supabase/supabase-js'
import { supabaseClient as supabase } from '@shared/config/db.config'
import { InquiryModel, MessageModel } from '@modules/admin/models/admin.model'
import { SendMessageDTO } from '@modules/admin/dtos/admin.dto'

export class EmployerRepository implements IEmployerRepository {
  private readonly supabase: SupabaseClient = supabase

  async findProfileByUserId(userId: string): Promise<EmployerProfileModel | null> {
    const { data, error } = await this.supabase
      .from('employer_profiles')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (error && error.code !== 'PGRST116') throw new CustomError(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
    return data || null
  }

  async updateProfile(userId: string, data: UpdateEmployerProfileDTO): Promise<EmployerProfileModel> {
    const { data: updated, error } = await this.supabase
      .from('employer_profiles')
      .update(data)
      .eq('user_id', userId)
      .select()
      .single()

    if (error) throw new CustomError(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
    return updated
  }

  async getStats(employerId: string): Promise<EmployerStats> {
    // 1. Get active jobs count
    const { count: activeJobs, error: activeError } = await this.supabase
      .from('jobs')
      .select('*', { count: 'exact', head: true })
      .eq('employer_id', employerId)
      .eq('status', 'active')

   
    const { data: jobs, error: jobsError } = await this.supabase
      .from('jobs')
      .select('id')
      .eq('employer_id', employerId)

    if (jobsError) throw new CustomError(jobsError.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
    const jobIds = jobs.map(j => j.id)

    const { count: totalApps, error: appsError } = await this.supabase
      .from('applications')
      .select('*', { count: 'exact', head: true })
      .in('job_id', jobIds)

    // 3. Get shortlisted
    const { count: shortlisted, error: shortError } = await this.supabase
      .from('applications')
      .select('*', { count: 'exact', head: true })
      .in('job_id', jobIds)
      .eq('status', 'shortlisted')

    // 4. Get hired
    const { count: hired, error: hiredError } = await this.supabase
      .from('applications')
      .select('*', { count: 'exact', head: true })
      .in('job_id', jobIds)
      .eq('status', 'hired')

    if (activeError || appsError || shortError || hiredError) {
      throw new CustomError('Failed to fetch stats', HTTP_STATUS.INTERNAL_SERVER_ERROR)
    }

    return {
      active_jobs: activeJobs || 0,
      total_applications: totalApps || 0,
      shortlisted_candidates: shortlisted || 0,
      hired_candidates: hired || 0
    }
  }

  async getJobs(employerId: string): Promise<JobModel[]> {
    const { data, error } = await this.supabase
      .from('jobs')
      .select(`
        *,
        category:job_categories(name, icon),
        applications_count:applications(count)
      `)
      .eq('employer_id', employerId)
      .order('created_at', { ascending: false })

    if (error) throw new CustomError(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
    
    // Fix for the applications count join issue in Supabase
    return data.map(job => ({
      ...job,
      applications_count: job.applications_count?.[0]?.count || 0
    }))
  }

  async getActiveJobsCount(employerId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('jobs')
      .select('*', { count: 'exact', head: true })
      .eq('employer_id', employerId)
      .eq('status', 'active')

    if (error) throw new CustomError(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
    return count || 0
  }

  private cleanJobData(data: CreateJobDTO | UpdateJobDTO) {
    const cleaned = { ...data } as any
    const numericFields = ['salary_min', 'salary_max']
    
    numericFields.forEach(field => {
      if (cleaned[field] === '' || cleaned[field] === undefined) {
        cleaned[field] = null
      }
    })
    
    return cleaned
  }

  async createJob(employerId: string, data: CreateJobDTO): Promise<JobModel> {
    const cleanedData = this.cleanJobData(data)
    const { data: created, error } = await this.supabase
      .from('jobs')
      .insert({ ...cleanedData, employer_id: employerId })
      .select()
      .single()

    if (error) throw new CustomError(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
    return created
  }

  async updateJob(jobId: string, employerId: string, data: UpdateJobDTO): Promise<JobModel> {
    const cleanedData = this.cleanJobData(data)
    const { data: updated, error } = await this.supabase
      .from('jobs')
      .update(cleanedData)
      .eq('id', jobId)
      .eq('employer_id', employerId)
      .select()
      .single()

    if (error) throw new CustomError(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
    return updated
  }

  async deleteJob(jobId: string, employerId: string): Promise<void> {
    const { error } = await this.supabase
      .from('jobs')
      .delete()
      .eq('id', jobId)
      .eq('employer_id', employerId)

    if (error) throw new CustomError(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
  }

  async getApplicantsByJob(jobId: string, employerId: string): Promise<ApplicationModel[]> {
    // 1. Verify job belongs to employer
    const { data: job, error: jobError } = await this.supabase
      .from('jobs')
      .select('id')
      .eq('id', jobId)
      .eq('employer_id', employerId)
      .single()

    if (jobError || !job) throw new CustomError('Unauthorized Access', HTTP_STATUS.FORBIDDEN)

    const { data, error } = await this.supabase
      .from('applications')
      .select(`
        *,
        candidate:candidate_profiles(
          id,
          full_name,
          avatar_url,
          location,
          skills,
          resume_url,
          user:users(email)
        )
      `)
      .eq('job_id', jobId)
      .order('applied_at', { ascending: false })

    if (error) throw new CustomError(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
    
    // Flatten candidate email
    return data.map((app: any) => ({
      ...app,
      candidate: {
        ...app.candidate,
        email: app.candidate.user.email
      }
    }))
  }

  async updateApplicationStatus(applicationId: string, data: UpdateApplicationStatusDTO): Promise<ApplicationModel> {
    const { data: updated, error } = await this.supabase
      .from('applications')
      .update(data)
      .eq('id', applicationId)
      .select()
      .single()

    if (error) throw new CustomError(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
    return updated
  }

  async getSubscription(employerId: string): Promise<EmployerSubscription | null> {
    const { data, error } = await this.supabase
      .from('employer_subscriptions')
      .select(`
        *,
        plan:subscription_plans(*)
      `)
      .eq('employer_id', employerId)
      .single()

    if (error && error.code !== 'PGRST116') throw new CustomError(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
    return data || null
  }

  async getDocuments(employerId: string): Promise<EmployerDocumentModel[]> {
    const { data, error } = await this.supabase
      .from('employer_documents')
      .select('*')
      .eq('employer_id', employerId)

    if (error) throw new CustomError(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
    return data
  }

  async addDocument(employerId: string, data: UploadDocumentDTO): Promise<EmployerDocumentModel> {
    const { data: created, error } = await this.supabase
      .from('employer_documents')
      .insert({ ...data, employer_id: employerId })
      .select()
      .single()

    if (error) throw new CustomError(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
    return created
  }

  async updateVerificationStatus(employerId: string, status: string): Promise<void> {
    const { error } = await this.supabase
      .from('employer_profiles')
      .update({ verification_status: status })
      .eq('id', employerId)

    if (error) throw new CustomError(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
  }

  async getPlanLimit(employerId: string): Promise<number> {
    const sub = await this.getSubscription(employerId)
    return sub?.plan?.job_listing_limit || 0
  }

  // Inquiries & Messages
  async getInquiries(employerId: string): Promise<InquiryModel[]> {
    const { data, error } = await this.supabase
      .from('inquiries')
      .select(`
        *,
        plan:subscription_plans(display_name)
      `)
      .eq('employer_id', employerId)
      .order('created_at', { ascending: false })

    if (error) throw new CustomError(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
    return data
  }

  async getInquiryMessages(employerId: string, inquiryId: string): Promise<MessageModel[]> {
    // Verify inquiry belongs to employer
    const { data: inquiry, error: inqErr } = await this.supabase
      .from('inquiries')
      .select('id')
      .eq('id', inquiryId)
      .eq('employer_id', employerId)
      .single()

    if (inqErr || !inquiry) throw new CustomError('Unauthorized access to inquiry', HTTP_STATUS.FORBIDDEN)

    const { data, error } = await this.supabase
      .from('messages')
      .select('*')
      .eq('inquiry_id', inquiryId)
      .order('sent_at', { ascending: true })

    if (error) throw new CustomError(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
    return data
  }

  async sendMessage(senderId: string, data: SendMessageDTO): Promise<MessageModel> {
    const { data: inserted, error } = await this.supabase
      .from('messages')
      .insert({
        inquiry_id: data.inquiry_id,
        sender_id: senderId,
        sender_role: 'employer',
        content: data.content
      })
      .select()
      .single()

    if (error) throw new CustomError(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)

    // Mark inquiry as in_progress if currently open
    await this.supabase
      .from('inquiries')
      .update({ status: 'in_progress', updated_at: new Date().toISOString() })
      .eq('id', data.inquiry_id)
      .eq('status', 'open')

    return inserted
  }
}
