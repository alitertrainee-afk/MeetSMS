import { z } from "zod";

export const registerSchema = z.object({
  body: z.object({
    username: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email format"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(100),
  }),
  query: z.object({}).optional(),
  params: z.object({}).optional(),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(6),
  }),
  query: z.object({}).optional(),
  params: z.object({}).optional(),
});
