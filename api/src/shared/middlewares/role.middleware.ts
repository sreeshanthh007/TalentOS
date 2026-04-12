import { Request, Response, NextFunction } from 'express'
import { HTTP_STATUS } from '@shared/constants/statusCodes.constants'
import { ERROR_MESSAGES } from '@shared/constants/messages.constants'
import { CustomRequest } from './auth.middleware'

export const roleMiddleware = (...allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = (req as CustomRequest).user

        if (!user || !allowedRoles.includes(user.role)) {
            res.status(HTTP_STATUS.FORBIDDEN).json({
                success: false,
                message: ERROR_MESSAGES.NOT_ALLOWED,
                user: user ? user.role : ""
            })
            return
        }
        next()
    }
}
