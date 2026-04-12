import { NextFunction, Request, Response } from "express";
import { PublicUseCase } from "../usecases/public.usecase";
import { MESSAGES } from "@shared/constants/messages.constants";


export class PublicController {

    constructor(
        private readonly publicUseCase: PublicUseCase
    ) {}

    async getAllCategories(req: Request, res: Response , next : NextFunction): Promise<void> {
       
        const result = await this.publicUseCase.getAllCategories();
        res.status(200).json({
            success: true,
            message: MESSAGES.CATEGORY.FETCH_SUCCESS,
            data: result
        });
    }

    async getPlans(req: Request, res: Response , next : NextFunction): Promise<void> {
        const result = await this.publicUseCase.getPlans();
        res.status(200).json({
            success: true,
            message: MESSAGES.ADMIN.PLANS_FETCH_SUCCESS,
            data: result
        });
    }
}
