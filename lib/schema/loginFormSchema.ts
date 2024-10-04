import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().trim().email("Invalid email address"),
  password: z
    .string()
    .trim()
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password can't exceed 50 characters"),
});
