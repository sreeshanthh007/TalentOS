import { UpdateProfileDTO, ApplyJobDTO } from '../dtos/candidates.dto'
import { CandidateProfileData, ApplicationModel } from '../../auth/models/user.model'

export interface ICandidateRepository {
  findProfileByUserId(userId: string): Promise<CandidateProfileData | null>
  updateProfile(userId: string, data: Partial<UpdateProfileDTO>): Promise<CandidateProfileData>
  getApplicationsByUserId(userId: string): Promise<ApplicationModel[]>
  getShortlistedByUserId(userId: string): Promise<ApplicationModel[]>
  createApplication(data: ApplyJobDTO & { candidate_id: string }): Promise<ApplicationModel>
  checkExistingApplication(jobId: string, candidateId: string): Promise<boolean>
}
