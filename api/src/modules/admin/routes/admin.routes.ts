import { Router } from 'express'
import { Resolver } from '@di/resolver'
import { roleMiddleware } from '@shared/middlewares/role.middleware'
import { verifyAuth } from '@shared/middlewares/auth.middleware'

const router = Router()


router.use(verifyAuth)

router.get('/stats', roleMiddleware('admin'), (req, res, next) => Resolver.adminController.getStats(req, res, next))

router.get('/employers', roleMiddleware('admin'), (req, res, next) => Resolver.adminController.getEmployers(req, res, next))
router.get('/employers/:id', roleMiddleware('admin'), (req, res, next) => Resolver.adminController.getEmployerById(req, res, next))
router.delete('/employers/:id', roleMiddleware('admin'), (req, res, next) => Resolver.adminController.deleteEmployer(req, res, next))
router.patch('/employers/:id/verification', roleMiddleware('admin'), (req, res, next) => Resolver.adminController.updateVerificationStatus(req, res, next))

router.get('/candidates', roleMiddleware('admin'), (req, res, next) => Resolver.adminController.getCandidates(req, res, next))
router.delete('/candidates/:id', roleMiddleware('admin'), (req, res, next) => Resolver.adminController.deleteCandidate(req, res, next))

router.patch('/users/:userId/block', roleMiddleware('admin'), (req, res, next) => Resolver.adminController.blockUser(req, res, next))

router.get('/plans', roleMiddleware('admin'), (req, res, next) => Resolver.adminController.getPlans(req, res, next))
router.patch('/plans/:id', roleMiddleware('admin'), (req, res, next) => Resolver.adminController.updatePlan(req, res, next))

router.get('/inquiries', roleMiddleware('admin'), (req, res, next) => Resolver.adminController.getInquiries(req, res, next))
router.patch('/inquiries/:id/status', roleMiddleware('admin'), (req, res, next) => Resolver.adminController.updateInquiryStatus(req, res, next))

router.get('/inquiries/:id/messages', roleMiddleware('admin', 'employer'), (req, res, next) => Resolver.adminController.getMessages(req, res, next))
router.post('/messages', roleMiddleware('admin', 'employer'), (req, res, next) => Resolver.adminController.sendMessage(req, res, next))

export { router as adminRouter }

