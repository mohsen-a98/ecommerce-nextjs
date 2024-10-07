"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useCart } from "../_context/cartContext/cartProvider";
import { formatCurrency } from "@/lib/utils";

function OrderSummary() {
  const { cart } = useCart();
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = Math.round(0.06 * total);

  return (
    <div className="mx-auto flex h-[430px] w-64 flex-col gap-3 rounded border border-neutral-black-100 px-6 py-8 sm:w-80 lg:mx-0">
      <h2 className="mb-7 text-base font-semibold">Order Summary</h2>

      <div className="flex items-center justify-between text-body font-medium">
        <span className="text-neutral-black-500">Subtotal: </span>
        <span>{formatCurrency(total)}</span>
      </div>

      <div className="flex items-center justify-between text-body font-medium">
        <span className="text-neutral-black-500">Shipping: </span>
        <span>Free</span>
      </div>

      <div className="flex items-center justify-between text-body font-medium">
        <span className="text-neutral-black-500">Tax: </span>
        <span>{formatCurrency(tax)}</span>
      </div>

      <div className="h-px w-full bg-neutral-white-400"></div>

      <div className="flex items-center justify-between text-body font-medium">
        <span>Total</span>
        <span>{formatCurrency(total + tax)}</span>
      </div>

      <Button className="my-5 h-11 w-full" disabled={cart.length === 0}>
        Checkout
      </Button>
      <Link
        href="/products"
        className="mx-auto text-xs font-medium underline underline-offset-4"
      >
        Continue Shopping
      </Link>
    </div>
  );
}

export default OrderSummary;
