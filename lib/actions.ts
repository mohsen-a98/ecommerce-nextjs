"use server";

import prisma from "@/prisma/prisma";
import {
  Comment,
  Order,
  OrderItem,
  Prisma,
  Product,
  Wishlist,
} from "@prisma/client";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { signIn } from "./auth/auth";
import { loginFormSchema } from "./schema/loginFormSchema";
import { signUpFormSchema } from "./schema/signUpFormSchema";
import { writeReviewFormSchemaWithProductId } from "./schema/writeReviewFormSchema";
import { addressFormSchema } from "./schema/addressFormSchema";
import {
  changePasswordFormSchema,
  createPasswordFormSchema,
} from "./schema/changePasswordFormSchema";
import { accountFormSchema } from "./schema/accountFormSchema";
import { SearchParams } from "./types";
import { PRODUCTS_PER_PAGE } from "./constant";
import { getLocalBase64 } from "./getLocalBase64";

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
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      return {
        success: false,
        errors: "Email already exists",
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
  } catch (error) {
    return {
      success: false,
      errors: "Something went wrong",
    };
  }
}

// login
export async function login(data: z.infer<typeof loginFormSchema>) {
  try {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
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

    return { error: "Something went wrong." };
  }
}

// change password
type ChangePasswordFormData = z.infer<typeof changePasswordFormSchema>;
export async function changePassword(
  formData: ChangePasswordFormData,
  userId: number,
) {
  const validatedFormData = changePasswordFormSchema.safeParse(formData);

  if (!validatedFormData.success) {
    return {
      success: false,
      errors: validatedFormData.error.flatten().fieldErrors,
    };
  }

  const { newPassword, oldPassword } = validatedFormData.data;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return {
        success: false,
        errors: "User not found",
      };
    }

    if (!user.password) {
      return {
        success: false,
        errors: "Password not set",
      };
    }
    const passwordMatch = await bcrypt.compare(oldPassword, user.password);

    if (!passwordMatch) {
      return {
        success: false,
        errors: "Old password doesn't match",
      };
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const result = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: hashedPassword,
      },
    });

    return {
      success: true,
      user: result,
    };
  } catch (error) {
    return {
      success: false,
      errors: "Something went wrong",
    };
  }
}

// create password
type CreatePasswordFormData = Omit<
  z.infer<typeof changePasswordFormSchema>,
  "oldPassword"
>;
export async function createPassword(
  formData: CreatePasswordFormData,
  userId: number,
) {
  const validatedFormData = createPasswordFormSchema.safeParse(formData);

  if (!validatedFormData.success) {
    return {
      success: false,
      errors: validatedFormData.error.flatten().fieldErrors,
    };
  }

  const { newPassword } = validatedFormData.data;

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  try {
    const result = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: hashedPassword,
      },
    });

    return {
      success: true,
      user: result,
    };
  } catch (error) {
    return {
      success: false,
      errors: "Something went wrong",
    };
  }
}

// has password
export async function existedPassword(userId: number) {
  try {
    const exist = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    return exist?.password ? true : false;
  } catch (error) {
    console.log(error);
    return false;
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

export async function addToWishlist(userId: number, productId: number) {
  let result: { success: boolean; error?: string; wishlist?: Wishlist };
  try {
    const existingWishlist = await prisma.wishlist.findFirst({
      where: {
        userId,
        productId,
      },
    });

    if (existingWishlist) {
      return (result = {
        success: false,
        error: "Item already in wishlist",
      });
    }

    const newWishlist = await prisma.wishlist.create({
      data: {
        userId,
        productId,
      },
    });

    result = {
      success: true,
      wishlist: newWishlist,
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

export async function checkInWishlist(userId: number, productId: number) {
  const wishlist = await prisma.wishlist.findFirst({
    where: {
      userId,
      productId,
    },
  });

  if (wishlist) {
    return {
      inWishlist: true,
      wishlistId: wishlist.id,
    };
  }

  return {
    inWishlist: false,
  };
}

/**
 * ACCOUNT
 */

export async function updateAccount(
  userId: number,
  data: z.infer<typeof accountFormSchema>,
) {
  const validatedFormData = accountFormSchema.safeParse(data);

  if (!validatedFormData.success) {
    return {
      success: false,
      errors: validatedFormData.error.flatten().fieldErrors,
    };
  }

  try {
    const emailAlreadyExists = await prisma.user.findUnique({
      where: {
        email: validatedFormData.data.email,
      },
    });

    if (emailAlreadyExists && emailAlreadyExists.id !== userId) {
      return {
        success: false,
        errors: "Email already in use",
      };
    }

    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name: validatedFormData.data.name,
        email: validatedFormData.data.email,
      },
    });

    return {
      success: true,
      user,
    };
  } catch (error) {
    return {
      success: false,
      errors: {
        account: "Something went wrong",
      },
    };
  }
}

/**
 * SEARCH
 */

export async function search(term: string) {
  try {
    const products = await prisma.product.findMany({
      where: {
        name: {
          contains: term,
          mode: "insensitive",
        },
      },
    });

    return products;
  } catch (error) {
    return [];
  }
}

/**
 * GET PRODUCTS BY SEARCHPARAMS
 */

export async function getProductsBySearchParams(searchParams: SearchParams) {
  try {
    const currentPage = Number(searchParams?.page) || 1;
    const minPriceFilter = searchParams?.minPrice || 0;
    const maxPriceFilter = searchParams?.maxPrice || 100;
    const sortBy = searchParams?.sortBy || "newest";
    const categoriesFilter =
      typeof searchParams?.category === "string"
        ? searchParams.category.split("&")
        : [];

    const categoriesIds = await Promise.all(
      categoriesFilter.map(async (category) => {
        const categoryData = await prisma.category.findFirst({
          where: {
            name: category,
          },
        });
        return categoryData?.id;
      }),
    ).then((ids) => ids.filter((id) => id !== undefined));

    const orderBy = () => {
      switch (sortBy) {
        case "price-asc":
          return { price: "asc" as Prisma.SortOrder };
        case "price-desc":
          return { price: "desc" as Prisma.SortOrder };
        case "newest":
          return { createdAt: "desc" as Prisma.SortOrder };
        case "oldest":
          return { createdAt: "asc" as Prisma.SortOrder };
        default:
          return { createdAt: "desc" as Prisma.SortOrder };
      }
    };

    const productsCount = await prisma.product.count({
      where: {
        price: {
          gte: Number(minPriceFilter),
          lte: Number(maxPriceFilter),
        },
        categoryId: {
          in: categoriesIds.length > 0 ? categoriesIds : undefined,
        },
      },
    });

    const totalPages = Math.ceil(productsCount / PRODUCTS_PER_PAGE);

    const adjustedCurrentPage = Math.max(1, Math.min(currentPage, totalPages));

    const products = await prisma.product.findMany({
      skip: PRODUCTS_PER_PAGE * (adjustedCurrentPage - 1),
      take: PRODUCTS_PER_PAGE,
      where: {
        price: {
          gte: Number(minPriceFilter),
          lte: Number(maxPriceFilter),
        },
        categoryId: {
          in: categoriesIds.length > 0 ? categoriesIds : undefined,
        },
      },
      orderBy: orderBy(),
    });

    const productsWithBlurDataUrl = await addBlurDataURLsToProducts(products);

    return {
      products: productsWithBlurDataUrl,
      totalPages,
      currentPage,
      adjustedCurrentPage,
      productsCount,
    };
  } catch (error) {
    console.log(error);
    return {
      products: [],
      totalPages: 0,
      currentPage: 1,
      adjustedCurrentPage: 1,
      productsCount: 0,
    };
  }
}

/**
 * GENERATE BLUR DATA URL
 */
export async function addBlurDataURLsToProducts(products: Product[]) {
  const productsWithBlurDataUrlPromises = products.map(async (product) => {
    const blurDataURL = await getLocalBase64(product.images[0]);
    return { ...product, blurDataURL: blurDataURL.base64 };
  });

  return await Promise.all(productsWithBlurDataUrlPromises);
}
