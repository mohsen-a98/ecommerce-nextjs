"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { formatCurrency } from "@/lib/utils";
import CloseIcon from "@/public/assets/X.svg";
import Link from "next/link";
import { useCart } from "../_context/cartContext/cartProvider";
import CartItemsList from "./CartItemsList";

function SlidingCart({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="p-0 [&_[id=close]]:hidden">
        <SheetHeader className="flex-row justify-between rounded bg-neutral-white-200 px-6 py-4 md:px-8">
          <SheetTitle>Shopping Cart</SheetTitle>
          <SheetClose className="!mt-0">
            <CloseIcon />
          </SheetClose>
        </SheetHeader>

        {cart.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center gap-4">
            <h3>Your cart is empty</h3>
            <SheetClose>
              <Link href="/products" className={buttonVariants()}>
                View Products
              </Link>
            </SheetClose>
          </div>
        )}

        {cart.length > 0 && (
          <CartItemsList
            cart={cart}
            removeFromCart={removeFromCart}
            updateQuantity={updateQuantity}
          />
        )}

        <div className="mt-2 flex flex-col border-t p-4">
          <div className="mb-6 mt-4 flex items-center justify-between">
            <span>Total</span>
            <span>{formatCurrency(totalPrice)}</span>
          </div>
          <Link href="/cart" className={buttonVariants()}>
            View Cart
          </Link>
          <Button variant="link" className="underline">
            Checkout
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default SlidingCart;
