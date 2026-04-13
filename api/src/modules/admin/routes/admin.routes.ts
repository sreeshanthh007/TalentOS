import { Router } from 'express'
import { Resolver } from '@di/resolver'
import { roleMiddleware } from '@shared/middlewares/role.middleware'
import { verifyAuth } from '@shared/middlewares/auth.middleware'

const router = Router()

router.use(verifyAuth)

// Stats
router.get('/stats',
  roleMiddleware('admin'),
  (req, res, next) => Resolver.adminController.getStats(req, res, next))

// Employers
router.get('/employers',
  roleMiddleware('admin'),
  (req, res, next) => Resolver.adminController.getEmployers(req, res, next))

router.get('/employers/:id',
  roleMiddleware('admin'),
  (req, res, next) => Resolver.adminController.getEmployerById(req, res, next))

router.delete('/employers/:id',
  roleMiddleware('admin'),
  (req, res, next) => Resolver.adminController.deleteEmployer(req, res, next))

router.patch('/employers/:id/verification',
  roleMiddleware('admin'),
  (req, res, next) => Resolver.adminController.updateVerificationStatus(req, res, next))

// Candidates
router.get('/candidates',
  roleMiddleware('admin'),
  (req, res, next) => Resolver.adminController.getCandidates(req, res, next))

router.delete('/candidates/:id',
  roleMiddleware('admin'),
  (req, res, next) => Resolver.adminController.deleteCandidate(req, res, next))

// Block/Unblock user
router.patch('/users/:userId/block',
  roleMiddleware('admin'),
  (req, res, next) => Resolver.adminController.blockUser(req, res, next))

// Plans
router.get('/plans',
  roleMiddleware('admin'),
  (req, res, next) => Resolver.adminController.getPlans(req, res, next))

router.put('/plans/:id',      // ← PUT not PATCH for full update
  roleMiddleware('admin'),
  (req, res, next) => Resolver.adminController.updatePlan(req, res, next))

// Inquiries
router.get('/inquiries',
  roleMiddleware('admin'),
  (req, res, next) => Resolver.adminController.getInquiries(req, res, next))

router.patch('/inquiries/:id/status',
  roleMiddleware('admin'),
  (req, res, next) => Resolver.adminController.updateInquiryStatus(req, res, next))

// Messages — ADMIN ONLY (employer has own endpoints in employer.routes.ts)
router.get('/inquiries/:id/messages',
  roleMiddleware('admin'),
  (req, res, next) => Resolver.adminController.getMessages(req, res, next))

router.post('/messages',
  roleMiddleware('admin'),
  (req, res, next) => Resolver.adminController.sendMessage(req, res, next))

// Testimonials
router.get('/testimonials',
  roleMiddleware('admin'),
  (req, res, next) => Resolver.adminController.getTestimonials(req, res, next))

router.post('/testimonials',
  roleMiddleware('admin'),
  (req, res, next) => Resolver.adminController.createTestimonial(req, res, next))

router.put('/testimonials/:id',
  roleMiddleware('admin'),
  (req, res, next) => Resolver.adminController.updateTestimonial(req, res, next))

router.delete('/testimonials/:id',
  roleMiddleware('admin'),
  (req, res, next) => Resolver.adminController.deleteTestimonial(req, res, next))

router.patch('/testimonials/:id/toggle',
  roleMiddleware('admin'),
  (req, res, next) => Resolver.adminController.toggleTestimonialStatus(req, res, next))

export { router as adminRouter }
