import { Request, Response } from 'express';
import { 
  registerCandidateSchema, 
  registerEmployerSchema, 
  loginSchema, 
  refreshTokenSchema 
} from '@modules/auth/validators/auth.validator';
import { asyncHandler } from '@shared/utils/asyncHandler';
import { HTTP_STATUS } from '@shared/constants/statusCodes.constants';
import { ERROR_MESSAGES, MESSAGES } from '@shared/constants/messages.constants';
import { AuthUsecase } from '@modules/auth/usecases/auth.usecase';
import { setAuthCookies, updateCookieWithAccessToken, clearAuthCookie } from '@shared/utils/cookie.util';
import { ICloudService } from '@modules/auth/interfaces/ICloudservice';
import { CustomRequest } from '@shared/middlewares/auth.middleware';

export class AuthController {
  constructor(
    private readonly authUsecase: AuthUsecase,
    private readonly cloudinarySignatureService: ICloudService,
  ) {}

  registerCandidate = asyncHandler(async (req: Request, res: Response) => {
    const validatedData = registerCandidateSchema.parse(req.body);

    await this.authUsecase.registerCandidate(validatedData);
    
    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: MESSAGES.AUTH.REGISTER_SUCCESS
    });
  });

  registerEmployer = asyncHandler(async (req: Request, res: Response) => {
    const validatedData = registerEmployerSchema.parse(req.body);

    await this.authUsecase.registerEmployer(validatedData);
    
    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: MESSAGES.AUTH.REGISTER_SUCCESS
    });
  });

  login = asyncHandler(async (req: Request, res: Response) => {
    const validatedData = loginSchema.parse(req.body);
    const result = await this.authUsecase.login(validatedData);
    
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
    const result = await this.authUsecase.refreshToken(validatedData);
    
    updateCookieWithAccessToken(res, result.accessToken, `${role}_access_token`);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: MESSAGES.AUTH.REFRESH_SUCCESS,
      data: result
    });
  });

  getCloudinarySignature = asyncHandler(async (req: Request, res: Response) => {
    const { folder } = req.query;

    if(!folder){
        return res.status(HTTP_STATUS.BAD_REQUEST)
            .json({success:false,message:ERROR_MESSAGES.FOLDER_NOT_FOUND})
    }

    const signature = this.cloudinarySignatureService.generateSignature(folder as string);
    
    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: signature
    });
  });

  logout = asyncHandler(async (req: Request, res: Response) => {
    const role = (req as CustomRequest).user?.role;
    
    if (!role) {
      return res.status(HTTP_STATUS.OK).json({
        success: true,
        message: "Logged out (no active session)"
      });
    }

    const accessToken = req.cookies[`${role}_access_token`];
    const refreshToken = req.cookies[`${role}_refresh_token`];

    if (accessToken) await this.authUsecase.blacklistToken(accessToken);
    if (refreshToken) await this.authUsecase.revokeRefreshToken(refreshToken);

    clearAuthCookie(res, `${role}_access_token`, `${role}_refresh_token`);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Logged out successfully"
    });
  });

}

