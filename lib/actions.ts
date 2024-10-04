"use server";

import prisma from "@/prisma/prisma";
import { z } from "zod";
import { signUpFormSchema } from "./schema/signUpFormSchema";
import bcrypt from "bcryptjs";
/**
 *  AUTH
 */

type SignUpFormData = z.infer<typeof signUpFormSchema>;
export async function signUp(data: SignUpFormData) {
  const validatedFormData = signUpFormSchema.safeParse(data);

  if (!validatedFormData.success) {
    return {
      success: false,
      errors: validatedFormData.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = validatedFormData.data;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (user) {
    return {
      success: false,
      errors: {
        email: "Email already exists",
      },
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return {
    success: true,
    user: newUser,
  };
}
