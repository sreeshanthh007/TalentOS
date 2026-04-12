import { Request, Response, NextFunction } from 'express'
import { IAdminUsecase } from '../interfaces/IAdminUsecase'
import { HTTP_STATUS } from '@shared/constants/statusCodes.constants'
import { asyncHandler } from '@shared/utils/asyncHandler'
import { CustomRequest } from '@shared/middlewares/auth.middleware'
import { MESSAGES } from '@shared/constants/messages.constants'
import { 
  updatePlanSchema, 
  updateVerificationSchema, 
  updateInquiryStatusSchema, 
  blockUserSchema, 
  sendMessageSchema 
} from '../validators/admin.validator'

export class AdminController {
  constructor(private readonly adminUsecase: IAdminUsecase) {}

  getStats = asyncHandler(async (req: Request, res: Response) => {
    const stats = await this.adminUsecase.getStats()
    res.status(HTTP_STATUS.OK).json({ 
      success: true, 
      message: MESSAGES.ADMIN.STATISTICS_FETCH_SUCCESS, 
      data: stats 
    })
  })

  getEmployers = asyncHandler(async (req: Request, res: Response) => {
    const { search, verification_status, page, limit } = req.query
    const result = await this.adminUsecase.getEmployers({
      search: search as string | undefined,
      verification_status: verification_status as string | undefined,
      page: Number(page) || 1,
      limit: Number(limit) || 6
    })
    res.status(HTTP_STATUS.OK).json({ 
      success: true, 
      message: MESSAGES.ADMIN.EMPLOYERS_FETCH_SUCCESS, 
      data: result 
    })
  })

  getEmployerById = asyncHandler(async (req: Request, res: Response) => {
    const employer = await this.adminUsecase.getEmployerById(req.params.id as string)
    res.status(HTTP_STATUS.OK).json({ 
      success: true, 
      message: MESSAGES.ADMIN.EMPLOYERS_FETCH_SUCCESS, 
      data: employer 
    })
  })

  deleteEmployer = asyncHandler(async (req: Request, res: Response) => {
    await this.adminUsecase.deleteEmployer(req.params.id as string)
    res.status(HTTP_STATUS.OK).json({ success: true, message: MESSAGES.ADMIN.EMPLOYER_DELETED })
  })


  updateVerificationStatus = asyncHandler(async (req: Request, res: Response) => {
    const validatedData = updateVerificationSchema.parse(req.body)
    await this.adminUsecase.updateVerificationStatus(req.params.id as string, validatedData)
    res.status(HTTP_STATUS.OK).json({ success: true, message: MESSAGES.ADMIN.STATUS_UPDATED })
  })

  getCandidates = asyncHandler(async (req: Request, res: Response) => {
    const { search, page, limit } = req.query
    const result = await this.adminUsecase.getCandidates({
      search: search as string | undefined,
      page: Number(page) || 1,
      limit: Number(limit) || 6
    })
    res.status(HTTP_STATUS.OK).json({ 
      success: true, 
      message: MESSAGES.ADMIN.CANDIDATES_FETCH_SUCCESS, 
      data: result 
    })
  })

 
  deleteCandidate = asyncHandler(async (req: Request, res: Response) => {
    await this.adminUsecase.deleteCandidate(req.params.id as string)
    res.status(HTTP_STATUS.OK).json({ success: true, message: MESSAGES.ADMIN.CANDIDATE_DELETED })
  })

  blockUser = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params
    const validatedData = blockUserSchema.parse(req.body)
    await this.adminUsecase.blockUser(userId as string, validatedData.is_blocked)
    res.status(HTTP_STATUS.OK).json({ success: true, message: MESSAGES.ADMIN.USER_BLOCK_UPDATED })
  })

  getPlans = asyncHandler(async (req: Request, res: Response) => {
    const plans = await this.adminUsecase.getPlans()
    res.status(HTTP_STATUS.OK).json({ 
      success: true, 
      message: MESSAGES.ADMIN.PLANS_FETCH_SUCCESS, 
      data: plans 
    })
  })

  updatePlan = asyncHandler(async (req: Request, res: Response) => {
    const validatedData = updatePlanSchema.parse(req.body)
    const plan = await this.adminUsecase.updatePlan(req.params.id as string, validatedData)
    res.status(HTTP_STATUS.OK).json({ success: true, message: MESSAGES.ADMIN.PLAN_UPDATED, data: plan })
  })

  getInquiries = asyncHandler(async (req: Request, res: Response) => {
    const inquiries = await this.adminUsecase.getInquiries()
    res.status(HTTP_STATUS.OK).json({ 
      success: true, 
      message: MESSAGES.ADMIN.INQUIRIES_FETCH_SUCCESS, 
      data: inquiries 
    })
  })

  updateInquiryStatus = asyncHandler(async (req: Request, res: Response) => {
    const validatedData = updateInquiryStatusSchema.parse(req.body)
    await this.adminUsecase.updateInquiryStatus(req.params.id as string, validatedData)
    res.status(HTTP_STATUS.OK).json({ success: true, message: MESSAGES.ADMIN.INQUIRY_STATUS_UPDATED })
  })

  getMessages = asyncHandler(async (req: Request, res: Response) => {
    const messages = await this.adminUsecase.getMessages(req.params.id as string)
    res.status(HTTP_STATUS.OK).json({ 
      success: true, 
      message: MESSAGES.ADMIN.MESSAGES_FETCH_SUCCESS, 
      data: messages 
    })
  })


  sendMessage = asyncHandler(async (req: Request, res: Response) => {
    const user = (req as CustomRequest).user
    const validatedData = sendMessageSchema.parse(req.body)
    const message = await this.adminUsecase.sendMessage(user.id, validatedData, user.role as 'admin' | 'employer')
    res.status(HTTP_STATUS.CREATED).json({ success: true, message: MESSAGES.ADMIN.MESSAGE_SENT, data: message })
  })
}
