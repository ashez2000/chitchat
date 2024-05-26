import { z } from 'zod'

export const signupSchema = z.object({
  username: z.string().min(3).max(45),
  password: z.string().min(6).max(256),
})

export const signinSchema = z.object({
  username: z.string(),
  password: z.string(),
})
