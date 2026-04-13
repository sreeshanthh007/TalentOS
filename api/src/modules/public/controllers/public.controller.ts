import { NextFunction, Request, Response } from "express";
import { PublicUseCase } from "../usecases/public.usecase";
import { MESSAGES } from "@shared/constants/messages.constants";
import { asyncHandler } from "@shared/utils/asyncHandler";
import { HTTP_STATUS } from "@shared/constants/statusCodes.constants";
import { CustomRequest } from "@shared/middlewares/auth.middleware";
import { createInquirySchema } from "../validators/public.validator";


export class PublicController {

    constructor(
        private readonly publicUseCase: PublicUseCase
    ) {}

    getAllCategories = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const result = await this.publicUseCase.getAllCategories();
        res.status(HTTP_STATUS.OK).json({
            success: true,
            message: MESSAGES.CATEGORY.FETCH_SUCCESS,
            data: result
        });
    });

    getPlans = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const result = await this.publicUseCase.getPlans();
        res.status(HTTP_STATUS.OK).json({
            success: true,
            message: MESSAGES.ADMIN.PLANS_FETCH_SUCCESS,
            data: result
        });
    });

    getFeaturedJobs = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const result = await this.publicUseCase.getFeaturedJobs();
        res.status(HTTP_STATUS.OK).json({
            success: true,
            message: MESSAGES.JOB.FETCH_SUCCESS,
            data: result
        });
    });

    getJobById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const result = await this.publicUseCase.getJobById(req.params.id as string);
        res.status(HTTP_STATUS.OK).json({
            success: true,
            message: MESSAGES.JOB.FETCH_SUCCESS,
            data: result
        });
    });

    getJobs = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const filters = {
            search: req.query.search as string,
            job_type: req.query.job_type as string,
            category_id: req.query.category_id as string,
            source: req.query.source as string,
            page: Number(req.query.page) || 1,
            limit: Number(req.query.limit) || 12
        };
        const result = await this.publicUseCase.getJobs(filters);
        res.status(HTTP_STATUS.OK).json({
            success: true,
            message: MESSAGES.JOB.FETCH_SUCCESS,
            data: result
        });
    });

    createInquiry = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const validatedData = createInquirySchema.parse(req.body);
        const user = (req as CustomRequest).user;
      
        await this.publicUseCase.createInquiry(validatedData, user?.id);

        res.status(HTTP_STATUS.CREATED).json({
            success: true,
            message: MESSAGES.INQUIRY.CREATE_SUCCESS,
            data: null
        });
    });

    getTestimonials = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const result = await this.publicUseCase.getTestimonials();
        res.status(HTTP_STATUS.OK).json({
            success: true,
            message: MESSAGES.SUCCESS,
            data: result
        });
    });
}
