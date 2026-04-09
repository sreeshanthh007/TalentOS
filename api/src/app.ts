import express, { Application } from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { ErrorMiddleware } from '@shared/middlewares/error.middleware';
import { authRouter } from '@modules/auth/routes/auth.routes';
import { HTTP_STATUS } from '@shared/constants/statusCodes.constants';

import { logger } from '@shared/utils/logger';

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
    this.app.use(cors());
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
    // TODO: Mount other routers
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
