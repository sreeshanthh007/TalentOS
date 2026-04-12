import { EmployerProfileModel, JobModel, ApplicationModel, EmployerDocumentModel } from '@modules/employer/models/employer.model'
import { CreateJobDTO, UpdateJobDTO, UpdateApplicationStatusDTO, UpdateEmployerProfileDTO, UploadDocumentDTO } from '@modules/employer/dtos/employer.dto'
import { EmployerStats, EmployerSubscription } from '@modules/employer/interfaces/employer.types'

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
}
