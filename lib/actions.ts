"use server";

import prisma from "@/prisma/prisma";
import { Comment, Order, OrderItem } from "@prisma/client";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { signIn } from "./auth/auth";
import { loginFormSchema } from "./schema/loginFormSchema";
import { signUpFormSchema } from "./schema/signUpFormSchema";
import { writeReviewFormSchemaWithProductId } from "./schema/writeReviewFormSchema";
import { addressFormSchema } from "./schema/AddressFormSchema";

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

/**
 *  ADDRESS
 */

export async function createAddress(
  data: z.infer<typeof addressFormSchema>,
  userId: number,
) {
  const validatedFormData = addressFormSchema.safeParse(data);

  if (!validatedFormData.success) {
    return {
      success: false,
      errors: validatedFormData.error.flatten().fieldErrors,
    };
  }

  const { streetAddress, state, country, zipCode, city } =
    validatedFormData.data;

  try {
    const address = await prisma.address.findFirst({
      where: {
        userId,
      },
    });

    if (address) {
      const updateAddress = await prisma.address.update({
        where: {
          id: address.id,
        },
        data: {
          street: streetAddress,
          state,
          city,
          zipCode,
          country,
        },
      });

      return {
        success: true,
        address: updateAddress,
      };
    }

    if (!address) {
      const newAddress = await prisma.address.create({
        data: {
          street: streetAddress,
          state,
          city,
          zipCode,
          country,
          userId,
        },
      });

      return {
        success: true,
        address: newAddress,
      };
    }
  } catch (error) {
    return {
      success: false,
      errors: {
        address: "Something went wrong",
      },
    };
  }
}

/**
 * CHECKOUT
 */

export async function checkout(
  orderData: Pick<Order, "totalPrice" | "addressId" | "userId">,
  orderItems: Pick<OrderItem, "quantity" | "productId">[],
) {
  try {
    const order = await prisma.order.create({
      data: {
        status: "PENDING",
        totalPrice: orderData.totalPrice,
        addressId: orderData.addressId,
        userId: orderData.userId,
        items: {
          create: orderItems,
        },
      },
    });

    return {
      success: true,
      order,
    };
  } catch (error) {
    return {
      success: false,
      errors: {
        checkout: "Something went wrong",
      },
    };
  }
}

/**
 * WISHLIST
 */

export async function removeFromWishlist(id: number) {
  let result: { success: boolean; error?: string };
  try {
    await prisma.wishlist.delete({
      where: {
        id,
      },
    });
    result = {
      success: true,
    };
  } catch (error) {
    result = {
      success: false,
      error: "Something went wrong",
    };
  }

  if (result.success) {
    revalidatePath("/dashboard/wishlist");
  }

  return result;
}

