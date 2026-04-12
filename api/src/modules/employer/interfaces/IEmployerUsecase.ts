import { EmployerProfileModel, JobModel, ApplicationModel, EmployerDocumentModel } from '@modules/employer/models/employer.model'
import { CreateJobDTO, UpdateJobDTO, UpdateApplicationStatusDTO, UpdateEmployerProfileDTO, UploadDocumentDTO } from '@modules/employer/dtos/employer.dto'
import { EmployerStats, EmployerSubscription } from '@modules/employer/interfaces/employer.types'


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
}
