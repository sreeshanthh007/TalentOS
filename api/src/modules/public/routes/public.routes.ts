import { Router } from 'express'
import { Resolver } from '@di/resolver'
// import { optionalAuth } from '@shared/middlewares/auth.middleware'

const router = Router()

// Categories & Plans (no auth needed)
router.get('/categories',
  (req, res, next) => Resolver.publicController.getAllCategories(req, res, next))

router.get('/plans',
  (req, res, next) => Resolver.publicController.getPlans(req, res, next))

router.get('/testimonials',
  (req, res, next) => Resolver.publicController.getTestimonials(req, res, next))

// Jobs — IMPORTANT: specific routes BEFORE parameterized /:id
router.get('/jobs/featured',
  (req, res, next) => Resolver.publicController.getFeaturedJobs(req, res, next))

router.get('/jobs',
  (req, res, next) => Resolver.publicController.getJobs(req, res, next))

router.get('/jobs/:id',
  (req, res, next) => Resolver.publicController.getJobById(req, res, next))

// Inquiries (public, optionalAuth to link employer_id if logged in)
router.post('/inquiries',
  (req, res, next) => Resolver.publicController.createInquiry(req, res, next))

export default router
