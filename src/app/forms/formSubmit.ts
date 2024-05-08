'use server'
import { registerSchema } from '@/app/forms/registerFormSchema'

export type FormState = {
  message: string
}

export async function onSubmitAction(data: FormData): Promise<FormState> {
  const formData = Object.fromEntries(data)
  const parsed = registerSchema.safeParse(formData)

  if (!parsed.success) {
    return {
      message: 'Invalid form data',
    }
  }
  if (!parsed.data.email.includes('@stud.noroff.no')) {
    return {
      message: 'Invalid! Email must be @stud.noroff.no',
    }
  }
  if (parsed.data.password !== parsed.data.confirmPassword) {
    return {
      message: 'Passwords do not match',
    }
  }
  if (parsed.data.password.length < 6) {
    return {
      message: 'Password must be at least 6 characters',
    }
  }
  if (parsed.data.name.length < 2) {
    return {
      message: 'Username must be at least 2 characters',
    }
  }
  if (parsed.data.name.includes(' ')) {
    return {
      message: 'Username must not contain spaces',
    }
  }
  if (parsed.data.name.includes('@')) {
    return {
      message: 'Username must not contain @',
    }
  }
  if (parsed.data.name.includes('.')) {
    return {
      message: 'Username must not contain .',
    }
  }
  return {
    message: 'Registered successfully!',
  }
}
