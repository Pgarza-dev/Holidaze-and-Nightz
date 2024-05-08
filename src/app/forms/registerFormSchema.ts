import { z } from 'zod'

export const registerSchema = z.object({
  name: z.string().trim().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  email: z
    .string()
    .trim()
    .email({
      message: 'Invalid! Email must be @stud.noroff.no',
    })
    .refine((email: string) => email.includes('@stud.noroff.no')),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
  confirmPassword: z.string().trim().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
  venueManager: z.boolean({
    message: 'You want to register as a venue manager?.',
  }),
})
