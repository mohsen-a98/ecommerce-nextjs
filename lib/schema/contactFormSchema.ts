import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name can't exceed 50 characters"),
  email: z.string().trim().email("Invalid email address"),
  subject: z
    .string()
    .trim()
    .min(3, "Subject must be at least 3 characters")
    .max(50, "Subject can't exceed 50 characters")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(3, "Message must be at least 3 characters")
    .max(500, "Message can't exceed 500 characters"),
});
