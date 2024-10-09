import { z } from "zod";

export const addressFormSchema = z.object({
  streetAddress: z
    .string()
    .trim()
    .min(1, "Street address is required")
    .max(100, "Street address can't be longer than 100 characters"),
  city: z
    .string()
    .trim()
    .min(1, "City is required")
    .max(50, "City can't be longer than 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "City can only contain letters and spaces"),
  state: z
    .string()
    .trim()
    .min(1, "State is required")
    .max(50, "State can't be longer than 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "State can only contain letters and spaces"),
  zipCode: z
    .string()
    .trim()
    .min(1, "Zip code is required")
    .max(10, "Zip code can't be longer than 10 characters")
    .regex(/^\d{4,10}$/, "Zip code must be between 4 and 10 digits"),
  country: z
    .string()
    .trim()
    .min(1, "Country is required")
    .max(50, "Country can't be longer than 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Country can only contain letters and spaces"),
});
