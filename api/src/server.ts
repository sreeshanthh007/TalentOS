import { App } from './app';
import { config } from '@shared/config/env.config';
import '@shared/config/redis.config';

import { DependencyInjection } from '@di/index';

DependencyInjection.registerAll();

const app = new App();
app.listen(config.PORT);
