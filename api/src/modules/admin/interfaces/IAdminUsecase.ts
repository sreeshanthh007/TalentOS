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

export interface IAdminUsecase {
  getStats(): Promise<AdminStatsModel>
  getEmployers(params: { 
    search?: string; 
    verification_status?: string; 
    page: number; 
    limit: number 
  }): Promise<{ data: AdminEmployerModel[]; total: number }>
  getEmployerById(employerId: string): Promise<AdminEmployerModel | null>
  deleteEmployer(employerId: string): Promise<void>
  updateVerificationStatus(employerId: string, data: UpdateVerificationDTO): Promise<void>
  getCandidates(params: { 
    search?: string; 
    page: number; 
    limit: number 
  }): Promise<{ data: AdminCandidateModel[]; total: number }>
  deleteCandidate(candidateId: string): Promise<void>
  blockUser(userId: string, isBlocked: boolean): Promise<void>
  getPlans(): Promise<SubscriptionPlanModel[]>
  updatePlan(planId: string, data: UpdatePlanDTO): Promise<SubscriptionPlanModel>
  getInquiries(): Promise<InquiryModel[]>
  updateInquiryStatus(inquiryId: string, data: UpdateInquiryStatusDTO): Promise<void>
  getMessages(inquiryId: string): Promise<MessageModel[]>
  sendMessage(
    senderId: string, 
    data: SendMessageDTO, 
    senderRole: 'admin' | 'employer'
  ): Promise<MessageModel>
}
