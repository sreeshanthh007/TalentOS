import { Router } from 'express'
import { Resolver } from '@di/resolver'
import { verifyAuth } from '@shared/middlewares/auth.middleware'
import { roleMiddleware } from '@shared/middlewares/role.middleware'

const router = Router()

router.use(verifyAuth)

router.get('/profile', roleMiddleware('employer'), (req, res, next) => Resolver.employerController.getProfile(req, res, next))
router.put('/profile', roleMiddleware('employer'), (req, res, next) => Resolver.employerController.updateProfile(req, res, next))
router.get('/stats', roleMiddleware('employer'), (req, res, next) => Resolver.employerController.getStats(req, res, next))
router.get('/jobs', roleMiddleware('employer'), (req, res, next) => Resolver.employerController.getJobs(req, res, next))
router.post('/jobs', roleMiddleware('employer'), (req, res, next) => Resolver.employerController.createJob(req, res, next))
router.put('/jobs/:jobId', roleMiddleware('employer'), (req, res, next) => Resolver.employerController.updateJob(req, res, next))
router.delete('/jobs/:jobId', roleMiddleware('employer'), (req, res, next) => Resolver.employerController.deleteJob(req, res, next))
router.get('/jobs/:jobId/applicants', roleMiddleware('employer'), (req, res, next) => Resolver.employerController.getApplicantsByJob(req, res, next))
router.patch('/applications/:applicationId/status', roleMiddleware('employer'), (req, res, next) => Resolver.employerController.updateApplicationStatus(req, res, next))
router.get('/subscription', roleMiddleware('employer'), (req, res, next) => Resolver.employerController.getSubscription(req, res, next))
router.get('/verification/documents', roleMiddleware('employer'), (req, res, next) => Resolver.employerController.getDocuments(req, res, next))
router.post('/verification/documents', roleMiddleware('employer'), (req, res, next) => Resolver.employerController.addDocument(req, res, next))
router.post('/verification/submit', roleMiddleware('employer'), (req, res, next) => Resolver.employerController.submitVerification(req, res, next))

// Inquiries & Messages
router.get('/inquiries', roleMiddleware('employer'), (req, res, next) => Resolver.employerController.getMyInquiries(req, res, next))
router.get('/inquiries/:inquiryId/messages', roleMiddleware('employer'), (req, res, next) => Resolver.employerController.getInquiryMessages(req, res, next))
router.post('/messages', roleMiddleware('employer'), (req, res, next) => Resolver.employerController.sendEmployerMessage(req, res, next))

export { router as employerRouter }
