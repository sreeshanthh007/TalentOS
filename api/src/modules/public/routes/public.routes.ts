import { Router } from "express";
import { Resolver } from "@di/resolver";


const router = Router();

router.get('/categories', (req, res, next) => Resolver.publicController.getAllCategories(req, res, next));

export default router;

