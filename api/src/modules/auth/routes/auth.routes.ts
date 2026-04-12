import { Router } from 'express';
import { Resolver } from '@di/resolver';
import { verifyAuth } from '@shared/middlewares/auth.middleware';

const router = Router();

router.post('/register/candidate', (req, res, next) => Resolver.authController.registerCandidate(req, res, next));
router.post('/register/employer', (req, res, next) => Resolver.authController.registerEmployer(req, res, next));
router.post('/login', (req, res, next) => Resolver.authController.login(req, res, next));
router.post('/refresh-token', (req, res, next) => Resolver.authController.refreshToken(req, res, next));
router.get('/cloudinary-signature', (req, res, next) => Resolver.authController.getCloudinarySignature(req, res, next));
router.post('/logout', verifyAuth, (req, res, next) => Resolver.authController.logout(req, res, next));

export { router as authRouter };
