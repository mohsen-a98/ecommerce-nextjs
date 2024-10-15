import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import CloseIcon from "@/public/assets/X.svg";
import { CartItem } from "../_context/cartContext/cartReducer";
import Image from "next/image";

interface Props {
  cart: CartItem[];
  updateQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
}

function CartItemsList({ cart, updateQuantity, removeFromCart }: Props) {
  return (
    <ul className="minimal-scrollbar h-[60vh] space-y-8 overflow-y-scroll p-4 md:h-[65vh]">
      {cart.map((product) => (
        <li
          key={product.id}
          className="grid grid-cols-[2fr_5fr] gap-2 border-neutral-white-200 pb-8 md:gap-8 [&:not(:last-child)]:border-b"
        >
          <div className="relative size-20">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
            />
            <span
              className="absolute right-0 top-0 size-6 bg-neutral-white-200/50"
              onClick={() => removeFromCart(product.id)}
            >
              <CloseIcon />
            </span>
          </div>
          <div className="flex flex-col justify-between">
            <h3 className="text-body font-medium">{product.name}</h3>
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-fit items-center gap-1 rounded border">
                <Button
                  variant="ghost"
                  onClick={() => {
                    if (product.quantity === 1) return null;

                    updateQuantity(product.id, product.quantity - 1);
                  }}
                  className="h-full"
                >
                  -
                </Button>
                <span>{product.quantity}</span>
                <Button
                  variant="ghost"
                  onClick={() => {
                    updateQuantity(product.id, product.quantity + 1);
                  }}
                  className="h-full"
                >
                  +
                </Button>
              </div>
              <p>{formatCurrency(product.price)}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CartItemsList;
