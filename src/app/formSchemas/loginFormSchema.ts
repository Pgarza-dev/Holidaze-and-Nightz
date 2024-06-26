import { z } from 'zod'

export const formSchema = z.object({
  email: z.string().trim().email({
    message: 'Please enter a valid email.',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
})
