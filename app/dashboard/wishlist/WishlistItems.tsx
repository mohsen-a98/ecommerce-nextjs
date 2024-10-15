"use client";

import { useCart } from "@/app/_context/cartContext/cartProvider";
import { CartItem } from "@/app/_context/cartContext/cartReducer";
import { Button } from "@/components/ui/button";
import { removeFromWishlist } from "@/lib/actions";
import { dateFormatter, formatCurrency } from "@/lib/utils";
import { Product, Wishlist } from "@prisma/client";
import Image from "next/image";
import { Fragment } from "react";
import toast from "react-hot-toast";

interface Props {
  wishlist: Wishlist & {
    product: Product;
  };
}

function WishlistItems({ wishlist }: Props) {
  const { addToCart, cart, removeFromCart } = useCart();
  const inCart = cart.some((item) => item.id === wishlist.productId);

  async function handleRemoveItem(id: number) {
    const result = await removeFromWishlist(id);

    if (!result.success && result.error) {
      toast.error(result.error);
    }

    if (result.success) {
      toast.success("Item removed successfully");
    }
  }

  function handleAddToCart(productId: number) {
    if (inCart) {
      removeFromCart(productId);
    } else {
      const item: CartItem = {
        id: productId,
        name: wishlist.product.name,
        quantity: 1,
        price: wishlist.product.price,
        images: wishlist.product.images,
        description: wishlist.product.description,
      };
      addToCart(item);
    }
  }

  return (
    <Fragment>
      <li
        key={wishlist?.id}
        className="flex max-w-[620px] items-center gap-8 py-8"
      >
        <Image
          src={wishlist.product.images[0]}
          width={80}
          height={80}
          alt={wishlist.product.name}
          className="rounded"
        />
        <div className="flex h-full flex-col justify-center gap-1">
          <h3 className="line-clamp-1 text-body font-medium">
            {wishlist.product.name}
          </h3>

          <p className="text-xs font-medium text-neutral-black-500">
            Added On: {dateFormatter(wishlist.createdAt)}
          </p>

          <button
            type="button"
            className="w-fit text-sm font-medium"
            onClick={() => handleRemoveItem(wishlist.id)}
          >
            Remove Item
          </button>
        </div>

        <p className="ml-auto text-body font-medium">
          {formatCurrency(wishlist.product.price)}
        </p>

        <Button
          variant="outline"
          onClick={() => handleAddToCart(wishlist.productId)}
        >
          {inCart ? "Remove From Cart" : "Add To Cart"}
        </Button>
      </li>
    </Fragment>
  );
}

export default WishlistItems;
