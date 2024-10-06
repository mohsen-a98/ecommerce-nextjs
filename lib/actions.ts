"use server";

import prisma from "@/prisma/prisma";
import { Comment } from "@prisma/client";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { signIn } from "./auth/auth";
import { loginFormSchema } from "./schema/loginFormSchema";
import { signUpFormSchema } from "./schema/signUpFormSchema";
import { writeReviewFormSchemaWithProductId } from "./schema/writeReviewFormSchema";

/**
 * WRITE REVIEW
 */
type ReviewData = z.infer<typeof writeReviewFormSchemaWithProductId>;
export async function addReview(reviewData: ReviewData) {
  const validatedFormData =
    writeReviewFormSchemaWithProductId.safeParse(reviewData);

  if (!validatedFormData.success) {
    return {
      success: false,
      errors: validatedFormData.error.flatten().fieldErrors,
    };
  }
  const { name, email, rating, review, userId, productId } =
    validatedFormData.data;
  let newReview: Comment;
  try {
    newReview = await prisma.comment.create({
      data: {
        name,
        email,
        rating,
        review,
        userId,
        productId,
      },
    });
  } catch (error) {
    return {
      success: false,
      errors: {
        review: "Something went wrong",
      },
    };
  }
  revalidatePath(`/products/${productId}`);
  return {
    success: true,
    review: newReview,
  };
}

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

// login
export async function login(data: z.infer<typeof loginFormSchema>) {
  try {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials." };
        default:
          return { error: "Something went wrong." };
      }
    }
    throw error;
  }
}
