import { Router } from 'express'
import { Resolver } from '@di/resolver'
import { verifyAuth } from '@shared/middlewares/auth.middleware'
import { roleMiddleware } from '@shared/middlewares/role.middleware'

const candidatesRouter = Router()
const candidateApplicationsRouter = Router()

// Apply verifyAuth to BOTH routers
candidatesRouter.use(verifyAuth)
candidateApplicationsRouter.use(verifyAuth)

// Candidate Profile Routes
candidatesRouter.get('/profile',
  roleMiddleware('candidate'),
  (req, res, next) => Resolver.candidatesController.getProfile(req, res, next))

candidatesRouter.put('/profile',
  roleMiddleware('candidate'),
  (req, res, next) => Resolver.candidatesController.updateProfile(req, res, next))

candidatesRouter.get('/applications',
  roleMiddleware('candidate'),
  (req, res, next) => Resolver.candidatesController.getApplications(req, res, next))

candidatesRouter.get('/shortlisted',
  roleMiddleware('candidate'),
  (req, res, next) => Resolver.candidatesController.getShortlisted(req, res, next))

candidatesRouter.post('/resume/generate',
  roleMiddleware('candidate'),
  (req, res, next) => Resolver.candidatesController.generateResume(req, res, next))

candidatesRouter.patch('/profile/avatar',
  roleMiddleware('candidate'),
  (req, res, next) => Resolver.candidatesController.updateAvatar(req, res, next))

// Application Routes — verifyAuth applied above via router.use()
candidateApplicationsRouter.post('/',
  roleMiddleware('candidate'),
  (req, res, next) => Resolver.candidatesController.applyForJob(req, res, next))

export { candidatesRouter, candidateApplicationsRouter }
