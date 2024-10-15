import { z } from "zod";

export const changePasswordFormSchema = z
  .object({
    oldPassword: z
      .string()
      .trim()
      .min(6, "Password must be at least 6 characters")
      .max(50, "Password can't exceed 50 characters"),
    newPassword: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(50, "Password can't exceed 50 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(50, "Password can't exceed 50 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
