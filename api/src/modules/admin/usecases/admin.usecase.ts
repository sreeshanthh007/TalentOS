import { IAdminUsecase } from '../interfaces/IAdminUsecase'
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
  UpdateVerificationDTO, 
  UpdateInquiryStatusDTO,
  CreateTestimonialDTO
} from '../dtos/admin.dto'
import { SubscriptionPlanModel } from '@modules/employers/models/employer.model'
import { CustomError } from '@shared/utils/CustomError'
import { ERROR_MESSAGES } from '@shared/constants/messages.constants'
import { HTTP_STATUS } from '@shared/constants/statusCodes.constants'

export class AdminUsecase implements IAdminUsecase {
  constructor(private readonly adminRepo: IAdminRepository) {}

  async getStats(): Promise<AdminStatsModel> {
    return this.adminRepo.getStats()
  }

  async getEmployers(params: { 
    search?: string; 
    verification_status?: string; 
    page: number; 
    limit: number 
  }): Promise<{ data: AdminEmployerModel[]; total: number }> {
    return this.adminRepo.getEmployers(params)
  }

  async getEmployerById(employerId: string): Promise<AdminEmployerModel | null> {
    return this.adminRepo.getEmployerById(employerId)
  }

  async deleteEmployer(employerId: string): Promise<void> {
    return this.adminRepo.deleteEmployer(employerId)
  }

  async updateVerificationStatus(employerId: string, data: UpdateVerificationDTO): Promise<void> {
    return this.adminRepo.updateVerificationStatus(employerId, data.status)
  }

  async getCandidates(params: { 
    search?: string; 
    page: number; 
    limit: number 
  }): Promise<{ data: AdminCandidateModel[]; total: number }> {
    return this.adminRepo.getCandidates(params)
  }

  async deleteCandidate(candidateId: string): Promise<void> {
    return this.adminRepo.deleteCandidate(candidateId)
  }

  async blockUser(userId: string, isBlocked: boolean): Promise<void> {
    return this.adminRepo.blockUser(userId, isBlocked)
  }

  async getPlans(): Promise<SubscriptionPlanModel[]> {
    return this.adminRepo.getPlans()
  }

  async updatePlan(planId: string, data: UpdatePlanDTO): Promise<SubscriptionPlanModel> {
    return this.adminRepo.updatePlan(planId, data)
  }

  async getInquiries(): Promise<InquiryModel[]> {
    return this.adminRepo.getInquiries()
  }

  async updateInquiryStatus(inquiryId: string, data: UpdateInquiryStatusDTO): Promise<void> {
    return this.adminRepo.updateInquiryStatus(inquiryId, data.status)
  }

  async getMessages(inquiryId: string): Promise<MessageModel[]> {
    return this.adminRepo.getMessages(inquiryId)
  }

  async sendMessage(
    senderId: string, 
    data: SendMessageDTO, 
    senderRole: 'admin' | 'employer'
  ): Promise<MessageModel> {
    return this.adminRepo.sendMessage(senderId, data, senderRole)
  }

  // Testimonials
  async getTestimonials(): Promise<TestimonialModel[]> {
    return this.adminRepo.getTestimonials()
  }

  async createTestimonial(data: CreateTestimonialDTO): Promise<TestimonialModel> {
    if (!data.author_name || !data.content) {
      throw new CustomError(ERROR_MESSAGES.VALIDATION_ERROR, HTTP_STATUS.BAD_REQUEST)
    }
    if (data.rating < 1 || data.rating > 5) {
      throw new CustomError(ERROR_MESSAGES.VALIDATION_ERROR, HTTP_STATUS.BAD_REQUEST)
    }
    return this.adminRepo.createTestimonial(data)
  }

  async updateTestimonial(
    id: string, 
    data: Partial<CreateTestimonialDTO>
  ): Promise<TestimonialModel> {
    return this.adminRepo.updateTestimonial(id, data)
  }

  async deleteTestimonial(id: string): Promise<void> {
    return this.adminRepo.deleteTestimonial(id)
  }

  async toggleTestimonialStatus(id: string, isActive: boolean): Promise<void> {
    return this.adminRepo.toggleTestimonialStatus(id, isActive)
  }
}
