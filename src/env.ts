import { z } from 'zod'

const envSchema = z.object({
  VITE_NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  VITE_API_URL: z.string().url(),
})

export const env = envSchema.parse(import.meta.env)
