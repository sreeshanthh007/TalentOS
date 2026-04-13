import { Router } from 'express'
import { Resolver } from '@di/resolver'
import { verifyAuth } from '@shared/middlewares/auth.middleware'
import { roleMiddleware } from '@shared/middlewares/role.middleware'

const candidatesRouter = Router()
const candidateApplicationsRouter = Router()

// Candidate Profile Routes
candidatesRouter.use(verifyAuth)

candidatesRouter.get('/profile', roleMiddleware('candidate'), (req, res, next) => Resolver.candidatesController.getProfile(req, res, next))
candidatesRouter.put('/profile', roleMiddleware('candidate'), (req, res, next) => Resolver.candidatesController.updateProfile(req, res, next));
candidatesRouter.get('/applications', roleMiddleware('candidate'), (req, res, next) => Resolver.candidatesController.getApplications(req, res, next))
candidatesRouter.get('/shortlisted', roleMiddleware('candidate'), (req, res, next) => Resolver.candidatesController.getShortlisted(req, res, next))
candidatesRouter.post('/resume/generate', roleMiddleware('candidate'), (req, res, next) => Resolver.candidatesController.generateResume(req, res, next))

// Application Routes
candidateApplicationsRouter.post('/', roleMiddleware('candidate'), (req, res, next) => Resolver.candidatesController.applyForJob(req, res, next))

export { candidatesRouter, candidateApplicationsRouter }
