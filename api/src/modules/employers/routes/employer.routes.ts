import { Router } from 'express'
import { Resolver } from '@di/resolver'
import { verifyAuth } from '@shared/middlewares/auth.middleware'

const router = Router()

router.use(verifyAuth)

router.get('/profile', (req, res, next) => Resolver.employerController.getProfile(req, res, next))
router.put('/profile', (req, res, next) => Resolver.employerController.updateProfile(req, res, next))
router.get('/stats', (req, res, next) => Resolver.employerController.getStats(req, res, next))
router.get('/jobs', (req, res, next) => Resolver.employerController.getJobs(req, res, next))
router.post('/jobs', (req, res, next) => Resolver.employerController.createJob(req, res, next))
router.put('/jobs/:jobId', (req, res, next) => Resolver.employerController.updateJob(req, res, next))
router.delete('/jobs/:jobId', (req, res, next) => Resolver.employerController.deleteJob(req, res, next))
router.get('/jobs/:jobId/applicants', (req, res, next) => Resolver.employerController.getApplicantsByJob(req, res, next))
router.patch('/applications/:applicationId/status', (req, res, next) => Resolver.employerController.updateApplicationStatus(req, res, next))
router.get('/subscription', (req, res, next) => Resolver.employerController.getSubscription(req, res, next))
router.get('/verification/documents', (req, res, next) => Resolver.employerController.getDocuments(req, res, next))
router.post('/verification/documents', (req, res, next) => Resolver.employerController.addDocument(req, res, next))
router.post('/verification/submit', (req, res, next) => Resolver.employerController.submitVerification(req, res, next))

// Inquiries & Messages
router.get('/inquiries', (req, res, next) => Resolver.employerController.getInquiries(req, res, next))
router.get('/inquiries/:inquiryId/messages', (req, res, next) => Resolver.employerController.getInquiryMessages(req, res, next))
router.post('/messages', (req, res, next) => Resolver.employerController.sendMessage(req, res, next))

export { router as employerRouter }
