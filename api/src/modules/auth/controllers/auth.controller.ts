import { Request, Response } from 'express';
import { 
  registerCandidateSchema, 
  registerEmployerSchema, 
  loginSchema, 
  refreshTokenSchema 
} from '../validators/auth.validator';
import { asyncHandler } from '@shared/utils/asyncHandler';
import { HTTP_STATUS } from '@shared/constants/statusCodes.constants';
import { MESSAGES } from '@shared/constants/messages.constants';
import { RegisterCandidateUsecase } from '../usecases/registerCandidate.usecase';
import { RegisterEmployerUsecase } from '../usecases/registerEmployer.usecase';
import { LoginUsecase } from '../usecases/login.usecase';
import { RefreshTokenUsecase } from '../usecases/refreshToken.usecase';
import { BlacklistTokenUseCase } from '../usecases/blacklistToken.usecase';
import { RevokeRefreshTokenUseCase } from '../usecases/revokeRefreshToken.usecase';
import { setAuthCookies, updateCookieWithAccessToken, clearAuthCookie } from '@shared/utils/cookie.util';

export class AuthController {
  constructor(
    private readonly registerCandidateUsecase: RegisterCandidateUsecase,
    private readonly registerEmployerUsecase: RegisterEmployerUsecase,
    private readonly loginUsecase: LoginUsecase,
    private readonly refreshTokenUsecase: RefreshTokenUsecase,
    private readonly blacklistTokenUsecase: BlacklistTokenUseCase,
    private readonly revokeRefreshTokenUsecase: RevokeRefreshTokenUseCase,
  ) {}

  registerCandidate = asyncHandler(async (req: Request, res: Response) => {
    const validatedData = registerCandidateSchema.parse(req.body);

    await this.registerCandidateUsecase.execute(validatedData);
    
 

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: MESSAGES.AUTH.REGISTER_SUCCESS
    });
  });

  registerEmployer = asyncHandler(async (req: Request, res: Response) => {

    const validatedData = registerEmployerSchema.parse(req.body);

    await this.registerEmployerUsecase.execute(validatedData);
    
 

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: MESSAGES.AUTH.REGISTER_SUCCESS
    });
  });

  login = asyncHandler(async (req: Request, res: Response) => {
    const validatedData = loginSchema.parse(req.body);
    const result = await this.loginUsecase.execute(validatedData);
    
    setAuthCookies(
      res, 
      result.accessToken, 
      result.refreshToken, 
      `${result.user.role}_access_token`, 
      `${result.user.role}_refresh_token`
    );

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: MESSAGES.AUTH.LOGIN_SUCCESS,
      data: {
        user: result.user,
        accessToken: result.accessToken
      }
    });
  });

  refreshToken = asyncHandler(async (req: Request, res: Response) => {
    const role = req.body.role || 'candidate';
    const refreshToken = req.cookies[`${role}_refresh_token`];

    const validatedData = refreshTokenSchema.parse({ refreshToken });
    const result = await this.refreshTokenUsecase.execute(validatedData);
    
    updateCookieWithAccessToken(res, result.accessToken, `${role}_access_token`);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: MESSAGES.AUTH.REFRESH_SUCCESS,
      data: result
    });
  });

  logout = asyncHandler(async (req: Request, res: Response) => {
    
    const accessToken = req.headers.authorization?.split(' ')[1];
    const role = req.body.role || 'candidate'; 
    const refreshToken = req.cookies[`${role}_refresh_token`];

    if (accessToken) await this.blacklistTokenUsecase.execute(accessToken);
    if (refreshToken) await this.revokeRefreshTokenUsecase.execute(refreshToken);

    clearAuthCookie(res, `${role}_access_token`, `${role}_refresh_token`);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Logged out successfully"
    });
  });
}
