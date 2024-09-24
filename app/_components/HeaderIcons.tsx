"use client";

import UserIcon from "@/public/assets/User-1.svg";
import CartIcon from "@/public/assets/Cart.svg";
import Link from "next/link";
import { useCart } from "../_context/cartContext/cartProvider";
import SlidingCart from "./SlidingCart";
import { useState } from "react";

function HeaderIcons() {
  const { cart } = useCart();
  const [isOpenCart, setIsOpenCart] = useState(false);

  function handleOpenCart() {
    setIsOpenCart(true);
  }

  return (
    <div className="flex items-center justify-between gap-8">
      <div className="relative" onClick={handleOpenCart}>
        <CartIcon className="size-6 cursor-pointer" />
        <span className="absolute -right-2 -top-2 rounded-full px-1 text-xs text-neutral-black-900">
          {cart.length}
        </span>
      </div>

      <SlidingCart isOpen={isOpenCart} onOpenChange={setIsOpenCart} />

      <Link href={"/profile"}>
        <UserIcon className="size-6 cursor-pointer" />
      </Link>
    </div>
  );
}

export default HeaderIcons;
