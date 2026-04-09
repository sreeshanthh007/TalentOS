import { NextFunction, Request, Response } from 'express';
import { RegisterUsecase } from '@modules/auth/usecases/register.usecase';
import { LoginUsecase } from '@modules/auth/usecases/login.usecase';
import { RefreshTokenUsecase } from '@modules/auth/usecases/refreshToken.usecase';
import { registerSchema, loginSchema, refreshTokenSchema } from '@modules/auth/validators/auth.validator';
import { HTTP_STATUS } from '@shared/constants/statusCodes.constants';
import { MESSAGES } from '@shared/constants/messages.constants';

export class AuthController {
  constructor(
    private readonly registerUsecase: RegisterUsecase,
    private readonly loginUsecase: LoginUsecase,
    private readonly refreshTokenUsecase: RefreshTokenUsecase
  ) {}

  public register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const result = registerSchema.safeParse(req.body);
    if (!result.success) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: result.error.issues[0].message
      });
      return;
    }

    const user = await this.registerUsecase.execute(result.data);
    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: MESSAGES.AUTH.REGISTER_SUCCESS,
      data: user
    });
  };

  public login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const result = loginSchema.safeParse(req.body);
    if (!result.success) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: result.error.issues[0].message
      });
      return;
    }

    const data = await this.loginUsecase.execute(result.data);
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: MESSAGES.AUTH.LOGIN_SUCCESS,
      data
    });
  };

  public refreshToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const result = refreshTokenSchema.safeParse(req.body);
    if (!result.success) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: result.error.issues[0].message
      });
      return;
    }

    const tokens = await this.refreshTokenUsecase.execute(result.data);
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: MESSAGES.AUTH.REFRESH_SUCCESS,
      data: tokens
    });
  };
}
