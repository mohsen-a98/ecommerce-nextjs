import { z } from "zod";

export const accountFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name can't exceed 50 characters"),
  email: z.string().trim().email("Invalid email address"),
});
