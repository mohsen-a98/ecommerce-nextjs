"use client";

import Link from "next/link";
import { useCart } from "../_context/cartContext/cartProvider";
import CartItem from "./CartItem";
import { buttonVariants } from "@/components/ui/button";

function CartList() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  return (
    <>
      {cart.length > 0 && (
        <ul className="minimal-scrollbar h-[55vh] space-y-8 overflow-y-scroll p-4">
          {cart.map((product) => (
            <li key={product.id}>
              <CartItem
                cartItem={product}
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
              />
            </li>
          ))}
        </ul>
      )}
      {cart.length === 0 && (
        <div className="flex h-full flex-col items-center justify-center gap-4 py-10">
          <h3>Your cart is empty</h3>
          <Link href="/products" className={buttonVariants()}>
            View Products
          </Link>
        </div>
      )}
    </>
  );
}

export default CartList;
