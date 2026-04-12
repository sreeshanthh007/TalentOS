import { ICandidateRepository } from '@modules/candidates/interfaces/ICandidateRepository'
import { UpdateProfileDTO, ApplyJobDTO, ResumeBuilderOutput } from '@modules/candidates/dtos/candidates.dto'
import { CandidateProfileData, ApplicationModel } from '@modules/auth/models/user.model'
import { IAIService } from '@shared/interfaces/IAIService'
import { AI_PROMPTS } from '@shared/constants/ai.constants'
import { MESSAGES } from '@shared/constants/messages.constants'
import { CustomError } from '@shared/utils/CustomError'
import { HTTP_STATUS } from '@shared/constants/statusCodes.constants'

export class CandidateUsecase {
  constructor(
    private readonly candidateRepository: ICandidateRepository,
    private readonly aiService: IAIService
  ) {}

  async getProfile(userId: string): Promise<CandidateProfileData> {
    const profile = await this.candidateRepository.findProfileByUserId(userId)
    if (!profile) {
      throw new CustomError(MESSAGES.CANDIDATE.NOT_FOUND, HTTP_STATUS.NOT_FOUND)
    }
    return profile
  }

  async updateProfile(userId: string, data: UpdateProfileDTO): Promise<CandidateProfileData> {
    return await this.candidateRepository.updateProfile(userId, data)
  }

  async getApplications(userId: string): Promise<ApplicationModel[]> {
    return await this.candidateRepository.getApplicationsByUserId(userId)
  }

  async getShortlisted(userId: string): Promise<ApplicationModel[]> {
    return await this.candidateRepository.getShortlistedByUserId(userId)
  }

  async applyForJob(userId: string, data: ApplyJobDTO): Promise<ApplicationModel> {
    const profile = await this.candidateRepository.findProfileByUserId(userId)
    if (!profile || !profile.id) {
      throw new CustomError(MESSAGES.CANDIDATE.NOT_FOUND, HTTP_STATUS.NOT_FOUND)
    }

    const exists = await this.candidateRepository.checkExistingApplication(data.job_id, profile.id!) 

    if (exists) {
      throw new CustomError(MESSAGES.CANDIDATE.ALREADY_APPLIED, HTTP_STATUS.CONFLICT)
    }

    return await this.candidateRepository.createApplication({ 
      ...data, 
      candidate_id: profile.id!
    })
  }


  async generateResumeContent(userId: string, targetJobTitle: string): Promise<ResumeBuilderOutput> {
    const profile = await this.getProfile(userId)
    
    const skills = profile.skills || []
    const experience = profile.experience || []
    const education = profile.education || []

    const prompt = AI_PROMPTS.RESUME_GENERATION(targetJobTitle, skills, experience, education)
    
    return await this.aiService.generateResponse<ResumeBuilderOutput>(prompt)
  }

  async updateAvatar(userId: string, avatarUrl: string): Promise<CandidateProfileData> {
    return await this.candidateRepository.updateProfile(userId, { avatar_url: avatarUrl })
  }
}

