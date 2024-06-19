import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  DATABASE_URL: z.string().default(''),
  JWT_SECRET: z.string().default(''),
});

const
    _env = envSchema.safeParse(process.env);

if (!_env.success) {

  console.error('❌ Invalid environment variables: ', _env.error);
  throw new Error(`Invalid environment variables`);
}

export const env = _env.data;