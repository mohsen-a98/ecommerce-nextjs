"use client";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "../_context/cartContext/cartProvider";
import { useRouter } from "next/navigation";

function OrderDetails() {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const { cart } = useCart();
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = Math.round(0.06 * total);

  async function handlePlaceOrder() {
    const form = document.getElementById("address-form") as HTMLFormElement;
    if (form) {
      setIsPending(true);
      form.requestSubmit();
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setIsPending(false);
    }
  }

  if (cart.length === 0) {
    router.push("/cart");
  }

  return (
    <div className="mx-auto flex h-[430px] w-full flex-col gap-3 px-6 py-8 sm:w-[372px] md:mx-0 md:w-[372px]">
      <h2 className="mb-7 text-base font-semibold">Your Order</h2>
      <div className="mb-6 flex flex-col items-center justify-between gap-8 md:flex-row">
        <div className="flex items-center gap-2">
          {cart.slice(0, 3).map((product) => (
            <div
              key={product.id}
              className="relative size-10 overflow-hidden rounded-full"
            >
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
        <Button
          variant="outline"
          className="text-body font-medium text-neutral-black-500"
        >
          <Link href="/cart">Edit Cart</Link>
        </Button>
      </div>

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

      <Button
        className="my-5 h-11 w-full"
        disabled={cart.length === 0 || isPending}
        onClick={handlePlaceOrder}
      >
        {isPending ? "Placing order..." : "Place Order"}
      </Button>
    </div>
  );
}

export default OrderDetails;
