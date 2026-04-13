import { supabaseClient } from '@shared/config/db.config'
import { ICandidateRepository } from '@modules/candidates/interfaces/ICandidateRepository'
import { UpdateProfileDTO, ApplyJobDTO } from '@modules/candidates/dtos/candidates.dto'
import { CandidateProfileData, ApplicationModel } from '@modules/auth/models/user.model'
import { HTTP_STATUS } from '@shared/constants/statusCodes.constants'
import { CustomError } from '@shared/utils/CustomError'

export class CandidatesRepository implements ICandidateRepository {
  async findProfileByUserId(userId: string): Promise<CandidateProfileData | null> {
    const { data, error } = await supabaseClient
      .from('candidate_profiles')
      .select('*, user:users(email)')
      .eq('user_id', userId)
      .single()

    if (error && error.code !== 'PGRST116') {
      throw new CustomError('Failed to fetch profile', HTTP_STATUS.INTERNAL_SERVER_ERROR)
    }

    if (!data) return null

    return {
      ...data,
      email: (data as any).user?.email
    }
  }

  async updateProfile(userId: string, data: Partial<UpdateProfileDTO>): Promise<CandidateProfileData> {
    const { data: updated, error } = await supabaseClient
      .from('candidate_profiles')
      .update(data)
      .eq('user_id', userId)
      .select()
      .single()

    if (error) {
      throw new CustomError('Failed to update profile', HTTP_STATUS.INTERNAL_SERVER_ERROR)
    }

    return updated
  }

  async getApplicationsByUserId(userId: string): Promise<ApplicationModel[]> {
    const { data: profile } = await supabaseClient
      .from('candidate_profiles')
      .select('id')
      .eq('user_id', userId)
      .single()
      
    if (!profile) return []

    const { data, error } = await supabaseClient
      .from('applications')
      .select(`
        *,
        job:jobs (
          *,
          employer:employer_profiles (
            company_name,
            company_logo_url
          )
        )
      `)
      .eq('candidate_id', profile.id)
      .order('applied_at', { ascending: false })

    if (error) {
      throw new CustomError('Failed to fetch applications', HTTP_STATUS.INTERNAL_SERVER_ERROR)
    }

    return data
  }

  async getShortlistedByUserId(userId: string): Promise<ApplicationModel[]> {
    const { data: profile } = await supabaseClient
      .from('candidate_profiles')
      .select('id')
      .eq('user_id', userId)
      .single()
      
    if (!profile) return []

    const { data, error } = await supabaseClient
      .from('applications')
      .select(`
        *,
        job:jobs (
          *,
          employer:employer_profiles (
            company_name,
            company_logo_url
          )
        )
      `)
      .eq('candidate_id', profile.id)
      .eq('status', 'shortlisted')
      .order('updated_at', { ascending: false })

    if (error) {
      throw new CustomError('Failed to fetch shortlisted', HTTP_STATUS.INTERNAL_SERVER_ERROR)
    }

    return data
  }

  async createApplication(data: ApplyJobDTO & { candidate_id: string }): Promise<ApplicationModel> {
    const { data: application, error } = await supabaseClient
      .from('applications')
      .insert({
        job_id: data.job_id,
        candidate_id: data.candidate_id,
        resume_url: data.resume_url,
        status: 'applied'
      })
      .select()
      .single()

    if (error) {
      throw new CustomError('Failed to create application', HTTP_STATUS.INTERNAL_SERVER_ERROR)
    }

    return application
  }

  async checkExistingApplication(jobId: string, candidateId: string): Promise<boolean> {
    const { data, error } = await supabaseClient
      .from('applications')
      .select('id')
      .eq('job_id', jobId)
      .eq('candidate_id', candidateId)
      .maybeSingle()

    if (error) {
      throw new CustomError('Failed to check existing application', HTTP_STATUS.INTERNAL_SERVER_ERROR)
    }

    return !!data
  }
}
