import { z } from 'zod'
import 'dotenv/config'

const envSchema = z.object({
  NODE_ENV: z.enum([
    'development',
    'test',
    'production'
  ]).default('development'),

  PORT: z.coerce.number().int().positive().default(3333),

  DATABASE_URL: z.string().url(),

  JWT_SECRET: z.string().min(32),

  ACCESS_TOKEN: z.string().min(1)
})

const result = envSchema.safeParse(process.env)

if (!result.success) {
  console.error(
    'Invalid environment variables:',
    result.error.flatten().fieldErrors
  )

  throw new Error('Invalid environment variables')
}

export const env = result.data