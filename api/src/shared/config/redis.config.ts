import { createClient } from 'redis';
import { config } from './env.config';
import { logger } from '@shared/utils/logger';

export const RedisClient = createClient({
    username: config.REDIS_USERNAME,
    password: config.REDIS_PASS,
    socket: {
        host: config.REDIS_HOST,
        port: Number(config.REDIS_PORT)
    }
});

RedisClient.on('error', (err) => logger.error('Redis Client Error', err));
RedisClient.on('connect', () => logger.info('Redis Client Connected'));

RedisClient.connect().catch((err) => {
    logger.error('Failed to connect to Redis', err);
});