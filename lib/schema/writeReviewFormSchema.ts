import { z } from "zod";

export const writeReviewFormSchema = z.object({
  email: z.string().min(1, "Required").email("Invalid email address"),
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name can't exceed 50 characters"),
  review: z
    .string()
    .min(3, "Review must be at least 3 characters")
    .max(500, "Review can't exceed 500 characters"),
  rating: z
    .number()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating can't exceed 5"),
});
