import { ICandidateRepository } from '../interfaces/ICandidateRepository'
import { UpdateProfileDTO, ApplyJobDTO, ResumeBuilderOutput } from '../dtos/candidates.dto'
import { CandidateProfileData, ApplicationModel } from '../../auth/models/user.model'
import { HTTP_STATUS } from '@shared/constants/statusCodes.constants'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { config } from '@shared/config/env.config'
import { CustomError } from '@shared/utils/CustomError'
import { ERROR_MESSAGES, MESSAGES } from '@shared/constants/messages.constants'

export class CandidateUsecase {
  constructor(private readonly candidateRepository: ICandidateRepository) {}

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

    const prompt = `
      You are a professional resume writer. Generate resume content for a candidate applying for the role of "${targetJobTitle}".
      Candidate Profile:
      Skills: ${skills.join(', ')}
      Experience: ${JSON.stringify(experience)}
      Education: ${JSON.stringify(education)}

      Return a JSON object with exactly these fields:
      {
        "summary": "2-3 sentence professional summary",
        "skills_section": "formatted skills as comma-separated string",
        "experience_bullets": ["bullet 1", "bullet 2", "bullet 3"]
      }
      Return ONLY the JSON object, no markdown, no explanation.
    `

    try {
      if (!config.GEMINI_API_KEY) {
         throw new CustomError('Gemini API key is missing', HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
      const genAI = new GoogleGenerativeAI(config.GEMINI_API_KEY)
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
      const result = await model.generateContent(prompt)
      const text = result.response.text()
      
      const jsonStr = text.replace(/```json|```/g, '').trim()
      const parsed = JSON.parse(jsonStr) as ResumeBuilderOutput
      
      return parsed
    } catch (error) {
      console.error('AI Resume Generation error:', error)
      throw new CustomError('Failed to generate resume content', HTTP_STATUS.INTERNAL_SERVER_ERROR)
    }
  }
}
