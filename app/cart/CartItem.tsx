"use client";

import Image from "next/image";
import { CartItem as CartItemType } from "../_context/cartContext/cartReducer";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import CloseIcon from "@/public/assets/X.svg";

interface Props {
  cartItem: CartItemType;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
}

function CartItem({ cartItem, removeFromCart, updateQuantity }: Props) {
  return (
    <div className="flex flex-col items-center gap-4 md:flex-row">
      <div className="relative size-20 overflow-hidden rounded md:mr-4">
        <Image
          src={cartItem.images[0]}
          className="size-20 object-cover"
          fill
          alt={cartItem.name}
        />
      </div>

      <div className="flex max-w-56 flex-col gap-1">
        <div className="line-clamp-1 text-body font-medium">
          {cartItem.name}
        </div>
        <div className="line-clamp-1 text-body">{cartItem.description}</div>
      </div>

      <div className="flex items-center gap-5 md:ml-auto md:gap-4">
        <p className="text-body font-medium">
          {formatCurrency(cartItem.price)}
        </p>

        <div className="flex h-9 w-fit items-center gap-1 rounded border">
          <Button
            variant="ghost"
            onClick={() => {
              if (cartItem.quantity === 1) return null;
              updateQuantity(cartItem.id, cartItem.quantity - 1);
            }}
          >
            -
          </Button>
          <span>{cartItem.quantity}</span>
          <Button
            variant="ghost"
            onClick={() => {
              updateQuantity(cartItem.id, cartItem.quantity + 1);
            }}
          >
            +
          </Button>
        </div>

        <button
          type="button"
          className="grid size-9 place-items-center rounded bg-neutral-white-200"
          onClick={() => removeFromCart(cartItem.id)}
        >
          <CloseIcon />
        </button>
      </div>
    </div>
  );
}

export default CartItem;
