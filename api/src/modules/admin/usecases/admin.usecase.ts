import { IAdminUsecase } from '../interfaces/IAdminUsecase'
import { IAdminRepository } from '../interfaces/IAdminRepository'
import { 
  AdminCandidateModel, 
  AdminEmployerModel, 
  AdminStatsModel, 
  InquiryModel, 
  MessageModel 
} from '../models/admin.model'
import { 
  UpdatePlanDTO, 
  SendMessageDTO, 
  UpdateVerificationDTO, 
  UpdateInquiryStatusDTO 
} from '../dtos/admin.dto'
import { SubscriptionPlanModel } from '@modules/employers/models/employer.model'

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
}
