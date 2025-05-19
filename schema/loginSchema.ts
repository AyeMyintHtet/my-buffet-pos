import { z } from 'zod';

// Define the schema for the login form
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password must be at least 6 characters'),
  captchaToken: z.string().optional(),
});

// Infer the type from the schema
export type LoginFormData = z.infer<typeof loginSchema>;