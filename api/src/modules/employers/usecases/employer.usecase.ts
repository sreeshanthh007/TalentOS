import { IEmployerUsecase } from '@modules/employers/interfaces/IEmployerUsecase'
import { IEmployerRepository } from '@modules/employers/interfaces/IEmployerRepository'
import { EmployerProfileModel, JobModel, ApplicationModel, EmployerDocumentModel } from '@modules/employers/models/employer.model'
import { CreateJobDTO, UpdateJobDTO, UpdateApplicationStatusDTO, UpdateEmployerProfileDTO, UploadDocumentDTO } from '@modules/employers/dtos/employer.dto'
import { CustomError } from '@shared/utils/CustomError'
import { HTTP_STATUS } from '@shared/constants/statusCodes.constants'
import { MESSAGES } from '@shared/constants/messages.constants'
import { EmployerStats, EmployerSubscription } from '@modules/employers/interfaces/employer.types'
import { InquiryModel, MessageModel } from '@modules/admin/models/admin.model'
import { SendMessageDTO } from '@modules/admin/dtos/admin.dto'

export class EmployerUsecase implements IEmployerUsecase {
  constructor(private readonly employerRepository: IEmployerRepository) {}

  async getProfile(userId: string): Promise<EmployerProfileModel> {
    const profile = await this.employerRepository.findProfileByUserId(userId)
    if (!profile) throw new CustomError(MESSAGES.EMPLOYER.NOT_FOUND, HTTP_STATUS.NOT_FOUND)
    return profile
  }

  async updateProfile(userId: string, data: UpdateEmployerProfileDTO): Promise<EmployerProfileModel> {
    return await this.employerRepository.updateProfile(userId, data)
  }

  async getStats(userId: string): Promise<EmployerStats> {
    const profile = await this.getProfile(userId)
    return await this.employerRepository.getStats(profile.id)
  }

  async getJobs(userId: string): Promise<JobModel[]> {
    const profile = await this.getProfile(userId)
    return await this.employerRepository.getJobs(profile.id)
  }

  async createJob(userId: string, data: CreateJobDTO): Promise<JobModel> {
    const profile = await this.getProfile(userId)
    
    const limit = await this.employerRepository.getPlanLimit(profile.id)
    const activeCount = await this.employerRepository.getActiveJobsCount(profile.id)

    if (activeCount >= limit) {
      throw new CustomError(MESSAGES.EMPLOYER.JOB_LIMIT_REACHED, HTTP_STATUS.FORBIDDEN)
    }

    return await this.employerRepository.createJob(profile.id, data)
  }

  async updateJob(userId: string, jobId: string, data: UpdateJobDTO): Promise<JobModel> {
    const profile = await this.getProfile(userId)
    return await this.employerRepository.updateJob(jobId, profile.id, data)
  }

  async deleteJob(userId: string, jobId: string): Promise<void> {
    const profile = await this.getProfile(userId)
    return await this.employerRepository.deleteJob(jobId, profile.id)
  }

  async getApplicantsByJob(userId: string, jobId: string): Promise<ApplicationModel[]> {
    const profile = await this.getProfile(userId)
    return await this.employerRepository.getApplicantsByJob(jobId, profile.id)
  }

  async updateApplicationStatus(userId: string, applicationId: string, data: UpdateApplicationStatusDTO): Promise<ApplicationModel> {
    if (data.star_rating !== undefined && (data.star_rating < 1 || data.star_rating > 5)) {
      throw new CustomError(MESSAGES.EMPLOYER.STAR_RATING_INVALID, HTTP_STATUS.BAD_REQUEST)
    }
    return await this.employerRepository.updateApplicationStatus(applicationId, data)
  }

  async getSubscription(userId: string): Promise<EmployerSubscription> {
    const profile = await this.getProfile(userId)
    const sub = await this.employerRepository.getSubscription(profile.id)
    if (!sub) throw new CustomError(MESSAGES.EMPLOYER.SUBSCRIPTION_NOT_FOUND, HTTP_STATUS.NOT_FOUND)
    return sub
  }

  async getDocuments(userId: string): Promise<EmployerDocumentModel[]> {
    const profile = await this.getProfile(userId)
    return await this.employerRepository.getDocuments(profile.id)
  }

  async addDocument(userId: string, data: UploadDocumentDTO): Promise<EmployerDocumentModel> {
    const profile = await this.getProfile(userId)
    return await this.employerRepository.addDocument(profile.id, data)
  }

  async submitVerification(userId: string): Promise<void> {
    const profile = await this.getProfile(userId)
    const docs = await this.employerRepository.getDocuments(profile.id)
    
    const hasPan = docs.some(d => d.document_type === 'pan')
    const hasIncorp = docs.some(d => d.document_type === 'incorporation_certificate')

    if (!hasPan || !hasIncorp) {
      throw new CustomError(MESSAGES.EMPLOYER.VERIFICATION_DOCS_REQUIRED, HTTP_STATUS.BAD_REQUEST)
    }

    await this.employerRepository.updateVerificationStatus(profile.id, 'submitted')
  }

  async getInquiries(userId: string): Promise<InquiryModel[]> {
    const profile = await this.getProfile(userId)
    return await this.employerRepository.getInquiries(profile.id)
  }

  async getInquiryMessages(userId: string, inquiryId: string): Promise<MessageModel[]> {
    const profile = await this.getProfile(userId)
    return await this.employerRepository.getInquiryMessages(profile.id, inquiryId)
  }

  async sendMessage(userId: string, data: SendMessageDTO): Promise<MessageModel> {
    const profile = await this.getProfile(userId)
    return await this.employerRepository.sendMessage(profile.id, data)
  }
}
