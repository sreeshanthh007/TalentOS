import { EmployerProfileModel, JobModel, ApplicationModel, EmployerDocumentModel } from '@modules/employers/models/employer.model'
import { CreateJobDTO, UpdateJobDTO, UpdateApplicationStatusDTO, UpdateEmployerProfileDTO, UploadDocumentDTO } from '@modules/employers/dtos/employer.dto'
import { EmployerStats, EmployerSubscription } from '@modules/employers/interfaces/employer.types'
import { InquiryModel, MessageModel } from '@modules/admin/models/admin.model'
import { SendMessageDTO } from '@modules/admin/dtos/admin.dto'

export interface IEmployerRepository {
  findProfileByUserId(userId: string): Promise<EmployerProfileModel | null>
  updateProfile(userId: string, data: UpdateEmployerProfileDTO): Promise<EmployerProfileModel>
  getStats(employerId: string): Promise<EmployerStats>
  getJobs(employerId: string): Promise<JobModel[]>
  getActiveJobsCount(employerId: string): Promise<number>
  createJob(employerId: string, data: CreateJobDTO): Promise<JobModel>
  updateJob(jobId: string, employerId: string, data: UpdateJobDTO): Promise<JobModel>
  deleteJob(jobId: string, employerId: string): Promise<void>
  getApplicantsByJob(jobId: string, employerId: string): Promise<ApplicationModel[]>
  updateApplicationStatus(applicationId: string, data: UpdateApplicationStatusDTO): Promise<ApplicationModel>
  getSubscription(employerId: string): Promise<EmployerSubscription | null>
  getDocuments(employerId: string): Promise<EmployerDocumentModel[]>
  addDocument(employerId: string, data: UploadDocumentDTO): Promise<EmployerDocumentModel>
  updateVerificationStatus(employerId: string, status: string): Promise<void>
  getPlanLimit(employerId: string): Promise<number>
  // Inquiries & Messages
  getInquiries(employerId: string): Promise<InquiryModel[]>
  getInquiryMessages(employerId: string, inquiryId: string): Promise<MessageModel[]>
  sendMessage(senderId: string, data: SendMessageDTO): Promise<MessageModel>
}
