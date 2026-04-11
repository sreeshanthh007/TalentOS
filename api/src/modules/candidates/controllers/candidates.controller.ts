import { Request, Response } from 'express'
import { CandidateUsecase } from '../usecases/candidate.usecase'
import { asyncHandler } from '@shared/utils/asyncHandler'
import { HTTP_STATUS } from '@shared/constants/statusCodes.constants'
import { CustomRequest } from '@shared/middlewares/auth.middleware'
import { MESSAGES } from '@shared/constants/messages.constants'

export class CandidatesController {
  constructor(private readonly candidateUsecase: CandidateUsecase) {}

  getProfile = asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as CustomRequest).user.id
    const profile = await this.candidateUsecase.getProfile(userId)
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: MESSAGES.CANDIDATE.PROFILE_FETCH_SUCCESS,
      data: profile
    })
  })

  updateProfile = asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as CustomRequest).user.id
    const updated = await this.candidateUsecase.updateProfile(userId, req.body)
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: MESSAGES.CANDIDATE.PROFILE_UPDATE_SUCCESS,
      data: updated
    })
  })

  getApplications = asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as CustomRequest).user.id
    const applications = await this.candidateUsecase.getApplications(userId)
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: MESSAGES.CANDIDATE.APPLICATIONS_FETCH_SUCCESS,
      data: applications
    })
  })

  getShortlisted = asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as CustomRequest).user.id
    const shortlisted = await this.candidateUsecase.getShortlisted(userId)
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: MESSAGES.CANDIDATE.SHORTLISTED_FETCH_SUCCESS,
      data: shortlisted
    })
  })

  applyForJob = asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as CustomRequest).user.id
    const application = await this.candidateUsecase.applyForJob(userId, req.body)
    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: MESSAGES.CANDIDATE.APPLY_SUCCESS,
      data: application
    })
  })

  generateResume = asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as CustomRequest).user.id
    const { target_job_title } = req.body
    const result = await this.candidateUsecase.generateResumeContent(userId, target_job_title)
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: MESSAGES.CANDIDATE.RESUME_GENERATE_SUCCESS,
      data: result
    })
  })
}
