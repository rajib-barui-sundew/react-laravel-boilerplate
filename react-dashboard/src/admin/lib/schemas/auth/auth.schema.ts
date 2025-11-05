import { z } from 'zod';

// Login schema - uses automatic validation messages from zod-error-map
export const loginSchema = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(6),
});

// Signup schema - uses automatic validation messages from zod-error-map
export const signupSchema = z.object({
  name: z.string().min(2),
  email: z.string().min(1).email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(1),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type LoginCredentials = z.infer<typeof loginSchema>;
export type SignupCredentials = z.infer<typeof signupSchema>;
