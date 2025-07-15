import { z } from 'zod'

const envSchema = z.object({
    JWT_SECRET: z.string(),
    DATABASE_URL: z.string(),
    ACCESS_TOKEN: z.string(),
    PORT: z.coerce.number().default(3333)
})

const _env = envSchema.safeParse(process.env)

if(!_env.success) {
    console.error('Invalid environment variables:', _env.error)
    throw new Error('Invalid environment variables')
}

export const env = _env.data