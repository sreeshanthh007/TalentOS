import express, { Application } from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { ErrorMiddleware } from '@shared/middlewares/error.middleware';
import { authRouter } from '@modules/auth/routes/auth.routes';
import publicRouter from '@modules/public/routes/public.routes';
import { candidatesRouter, candidateApplicationsRouter } from '@modules/candidates/routes/candidates.routes';
import { employerRouter } from '@modules/employers/routes/employer.routes';
import { adminRouter } from '@modules/admin/routes/admin.routes';


import { logger } from '@shared/utils/logger';
import { config } from '@shared/config/env.config';

export class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.initMiddlewares();
    this.initRoutes();
    this.initErrorHandler();
  }

  private initMiddlewares(): void {
    this.app.use(helmet());
    this.app.use(morgan('dev'));

    this.app.use(cors({
      origin: config.CLIENT_URL,
      credentials: true
    }));

    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());

    this.app.use(rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100
    }));
  }

  private initRoutes(): void {
    this.app.use('/api/v1/auth', authRouter);
    this.app.use('/api/v1', publicRouter);
    this.app.use('/api/v1/candidate', candidatesRouter);
    this.app.use('/api/v1/employer', employerRouter);
    this.app.use('/api/v1/admin', adminRouter);
    this.app.use('/api/v1/applications', candidateApplicationsRouter);
  }



  private initErrorHandler(): void {
    this.app.use(ErrorMiddleware.handleError);
  }

  public listen(port: number): void {
    this.app.listen(port, () => {
      logger.info(`Server running on port ${port}`);
    });
  }
}
