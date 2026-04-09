import { Router } from 'express';
import { Resolver } from '@di/index';
import { asyncHandler } from '@shared/utils/asyncHandler';

const authRouter = Router();

authRouter.post('/register', asyncHandler((req, res, next) => 
  Resolver.authController.register(req, res, next)
));
authRouter.post('/login', asyncHandler((req, res, next) => 
  Resolver.authController.login(req, res, next)
));
authRouter.post('/refresh-token', asyncHandler((req, res, next) => 
  Resolver.authController.refreshToken(req, res, next)
));

export { authRouter };
