"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import HeartIcon from "@/public/assets/Heart.svg";
import ShareIcon from "@/public/assets/Share.svg";
import StarIcon from "@/public/assets/Star.svg";
import { Product } from "@prisma/client";
import { useEffect, useState } from "react";
import { useCart } from "../_context/cartContext/cartProvider";
import { CartItem } from "../_context/cartContext/cartReducer";
import ProductDetailsImages from "./ProductDetailsImages";
import SlidingCart from "./SlidingCart";

interface Props {
  product: Product;
}

function ProductDetails({ product }: Props) {
  const [isOpenCart, setIsOpenCart] = useState(false);
  const { cart, addToCart, removeFromCart, updateQuantity } = useCart();

  const quantityInCart = cart.find((item) => item.id === product.id)?.quantity;
  const [quantity, setQuantity] = useState(quantityInCart || 1);

  const inCart = cart.some((item) => item.id === product.id);

  useEffect(
    function () {
      const productInCart = cart.find((item) => item.id === product.id);
      if (productInCart) {
        setQuantity(productInCart.quantity);
      }
    },
    [cart, product.id],
  );

  function handleAddToCart() {
    const item: CartItem = {
      id: product.id,
      name: product.name,
      quantity,
      price: product.price,
      images: product.images,
    };

    addToCart(item);
    setIsOpenCart(true);
  }

  return (
    <div className="grid h-fit grid-cols-1 gap-3 overflow-hidden rounded border md:grid-cols-2 lg:mx-auto lg:h-[450px] lg:w-full">
      <ProductDetailsImages
        images={product.images}
        productName={product.name}
      />
      <div className="flex h-full flex-col justify-around gap-6 px-5 py-3">
        <div className="flex items-center justify-between gap-3">
          <h3>{product?.name}</h3>
          <div className="self-start">
            <ShareIcon className="cursor-pointer" />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Badge variant="secondary" className="h-7 font-medium">
            <StarIcon className="size-6" /> <span>4.2 — 54 reviews</span>
          </Badge>
          <Badge className="h-7 font-medium" variant="outline">
            IN STOCK
          </Badge>
        </div>

        <div>{product?.price && formatCurrency(product?.price)}</div>

        <div className="flex flex-col gap-3">
          <div className="text-sm uppercase">quantity</div>
          <div className="flex w-fit items-center gap-5 rounded border">
            <Button
              variant="ghost"
              onClick={() => {
                if (quantity === 1) return null;
                setQuantity(quantity - 1);
                updateQuantity(product.id, quantity - 1);
              }}
            >
              -
            </Button>
            <span>{quantityInCart || quantity}</span>
            <Button
              variant="ghost"
              onClick={() => {
                setQuantity(quantity + 1);
                updateQuantity(product.id, quantity + 1);
              }}
            >
              +
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-5">
            {!inCart ? (
              <Button className="w-52" onClick={handleAddToCart}>
                Add to cart
              </Button>
            ) : (
              <Button
                className="w-52"
                onClick={() => removeFromCart(product.id)}
              >
                Remove from cart
              </Button>
            )}
            <div className="grid h-full place-items-center rounded border p-2">
              <HeartIcon className="cursor-pointer" />
            </div>
          </div>
          <p className="-translate-y-2 text-xs font-medium uppercase text-neutral-black-500">
            — Free shipping on orders $100+
          </p>
        </div>
      </div>
      <SlidingCart isOpen={isOpenCart} onOpenChange={setIsOpenCart} />
    </div>
  );
}
export default ProductDetails;
