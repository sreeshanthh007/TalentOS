import dotenv from 'dotenv';
dotenv.config();

export const config = {
  PORT: Number(process.env.PORT),
  NODE_ENV: process.env.NODE_ENV,
  CLIENT_URL: process.env.CLIENT_URL,
  SALTROUNDS: Number(process.env.SALTROUNDS!),
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET!,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET!,
  JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN!,
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN!,
  REDIS_HOST: process.env.REDIS_HOST!,
  REDIS_PORT: process.env.REDIS_PORT!,
  REDIS_USERNAME: process.env.REDIS_USERNAME!,
  REDIS_PASS: process.env.REDIS_PASS,
  SUPABASE_URL: process.env.SUPABASE_URL!,
  SUPABASE_SERVICE_KEY: process.env.SUPABASE_SERVICE_KEY!,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY
} as const;
