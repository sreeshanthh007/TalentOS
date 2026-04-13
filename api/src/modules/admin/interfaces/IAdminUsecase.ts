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
  // Testimonials
  getTestimonials(): Promise<TestimonialModel[]>
  createTestimonial(data: CreateTestimonialDTO): Promise<TestimonialModel>
  updateTestimonial(id: string, data: Partial<CreateTestimonialDTO>): Promise<TestimonialModel>
  deleteTestimonial(id: string): Promise<void>
  toggleTestimonialStatus(id: string, isActive: boolean): Promise<void>
}
