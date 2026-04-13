import { Router } from "express";
import { Resolver } from "@di/resolver";
import { optionalAuth } from "@shared/middlewares/auth.middleware";


const router = Router();


router.get('/categories', (req, res, next) => Resolver.publicController.getAllCategories(req, res, next));
router.get('/plans', (req, res, next) => Resolver.publicController.getPlans(req, res, next));
router.get('/jobs', (req, res, next) => Resolver.publicController.getJobs(req, res, next));
router.get('/jobs/featured', (req, res, next) => Resolver.publicController.getFeaturedJobs(req, res, next));
router.get('/jobs/:id', (req, res, next) => Resolver.publicController.getJobById(req, res, next));
router.get('/testimonials', (req, res, next) => Resolver.publicController.getTestimonials(req, res, next));
router.post('/inquiries', optionalAuth, (req, res, next) => Resolver.publicController.createInquiry(req, res , next));

export default router;

