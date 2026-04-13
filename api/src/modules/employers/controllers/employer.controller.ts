import { Request, Response } from 'express'
import { IEmployerUsecase } from '@modules/employers/interfaces/IEmployerUsecase'
import { asyncHandler } from '@shared/utils/asyncHandler'
import { HTTP_STATUS } from '@shared/constants/statusCodes.constants'
import { CustomRequest } from '@shared/middlewares/auth.middleware'
import { MESSAGES } from '@shared/constants/messages.constants'


export class EmployerController {
  constructor(private readonly employerUsecase: IEmployerUsecase) {}

  getProfile = asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as CustomRequest).user.id
    const profile = await this.employerUsecase.getProfile(userId)
    res.status(HTTP_STATUS.OK).json({ success: true, data: profile })
  })

  updateProfile = asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as CustomRequest).user.id
    const updated = await this.employerUsecase.updateProfile(userId, req.body)
    res.status(HTTP_STATUS.OK).json({ 
      success: true, 
      message: MESSAGES.EMPLOYER.PROFILE_UPDATED, 
      data: updated 
    })
  })

  getStats = asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as CustomRequest).user.id
    const stats = await this.employerUsecase.getStats(userId)
    res.status(HTTP_STATUS.OK).json({ success: true, data: stats })
  })

  getJobs = asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as CustomRequest).user.id
    const jobs = await this.employerUsecase.getJobs(userId)
    res.status(HTTP_STATUS.OK).json({ success: true, data: jobs })
  })

  createJob = asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as CustomRequest).user.id
    const job = await this.employerUsecase.createJob(userId, req.body)
    res.status(HTTP_STATUS.CREATED).json({ 
      success: true, 
      message: MESSAGES.EMPLOYER.JOB_CREATED, 
      data: job 
    })
  })

  updateJob = asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as CustomRequest).user.id
    const jobId = req.params.jobId as string
    const job = await this.employerUsecase.updateJob(userId, jobId, req.body)
    res.status(HTTP_STATUS.OK).json({ 
      success: true, 
      message: MESSAGES.EMPLOYER.JOB_UPDATED, 
      data: job 
    })
  })

  deleteJob = asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as CustomRequest).user.id
    const jobId = req.params.jobId as string  
    await this.employerUsecase.deleteJob(userId, jobId)
    res.status(HTTP_STATUS.OK).json({ success: true, message: MESSAGES.EMPLOYER.JOB_DELETED })
  })

  getApplicantsByJob = asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as CustomRequest).user.id
    const jobId = req.params.jobId as string
    const applicants = await this.employerUsecase.getApplicantsByJob(userId, jobId)
    res.status(HTTP_STATUS.OK).json({ success: true, data: applicants })
  })

  updateApplicationStatus = asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as CustomRequest).user.id
    const applicationId = req.params.applicationId as string
    const applicant = await this.employerUsecase.updateApplicationStatus(userId, applicationId, req.body)
    res.status(HTTP_STATUS.OK).json({ 
      success: true, 
      message: MESSAGES.EMPLOYER.STATUS_UPDATED, 
      data: applicant 
    })
  })

  getSubscription = asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as CustomRequest).user.id
    const sub = await this.employerUsecase.getSubscription(userId)
    res.status(HTTP_STATUS.OK).json({ success: true, data: sub })
  })

  getDocuments = asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as CustomRequest).user.id
    const docs = await this.employerUsecase.getDocuments(userId)
    res.status(HTTP_STATUS.OK).json({ success: true, data: docs })
  })

  addDocument = asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as CustomRequest).user.id
    const doc = await this.employerUsecase.addDocument(userId, req.body)
    res.status(HTTP_STATUS.CREATED).json({ 
      success: true, 
      message: MESSAGES.EMPLOYER.DOCUMENT_UPLOADED, 
      data: doc 
    })
  })

  submitVerification = asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as CustomRequest).user.id
    await this.employerUsecase.submitVerification(userId)
    res.status(HTTP_STATUS.OK).json({ 
      success: true, 
      message: MESSAGES.EMPLOYER.VERIFICATION_SUBMITTED 
    })
  })
  
  getMyInquiries = asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as CustomRequest).user.id
    const inquiries = await this.employerUsecase.getMyInquiries(userId)
    res.status(HTTP_STATUS.OK).json({ success: true, data: inquiries })
  })

  getInquiryMessages = asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as CustomRequest).user.id
    const inquiryId = req.params.inquiryId as string
    const messages = await this.employerUsecase.getInquiryMessages(userId, inquiryId)
    res.status(HTTP_STATUS.OK).json({ success: true, data: messages })
  })

  sendEmployerMessage = asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as CustomRequest).user.id
    const message = await this.employerUsecase.sendEmployerMessage(userId, req.body)
    res.status(HTTP_STATUS.CREATED).json({ success: true, data: message })
  })
}
