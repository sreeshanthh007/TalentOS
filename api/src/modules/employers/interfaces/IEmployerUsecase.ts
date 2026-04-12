import { EmployerProfileModel, JobModel, ApplicationModel, EmployerDocumentModel } from '@modules/employers/models/employer.model'
import { CreateJobDTO, UpdateJobDTO, UpdateApplicationStatusDTO, UpdateEmployerProfileDTO, UploadDocumentDTO } from '@modules/employers/dtos/employer.dto'
import { EmployerStats, EmployerSubscription } from '@modules/employers/interfaces/employer.types'
import { InquiryModel, MessageModel } from '@modules/admin/models/admin.model'
import { SendMessageDTO } from '@modules/admin/dtos/admin.dto'


export interface IEmployerUsecase {
  getProfile(userId: string): Promise<EmployerProfileModel>
  updateProfile(userId: string, data: UpdateEmployerProfileDTO): Promise<EmployerProfileModel>
  getStats(userId: string): Promise<EmployerStats>
  getJobs(userId: string): Promise<JobModel[]>
  createJob(userId: string, data: CreateJobDTO): Promise<JobModel>
  updateJob(userId: string, jobId: string, data: UpdateJobDTO): Promise<JobModel>
  deleteJob(userId: string, jobId: string): Promise<void>
  getApplicantsByJob(userId: string, jobId: string): Promise<ApplicationModel[]>
  updateApplicationStatus(userId: string, applicationId: string, data: UpdateApplicationStatusDTO): Promise<ApplicationModel>
  getSubscription(userId: string): Promise<EmployerSubscription>
  getDocuments(userId: string): Promise<EmployerDocumentModel[]>
  addDocument(userId: string, data: UploadDocumentDTO): Promise<EmployerDocumentModel>
  submitVerification(userId: string): Promise<void>
  getInquiries(userId: string): Promise<InquiryModel[]>
  getInquiryMessages(userId: string, inquiryId: string): Promise<MessageModel[]>
  sendMessage(userId: string, data: SendMessageDTO): Promise<MessageModel>
}
