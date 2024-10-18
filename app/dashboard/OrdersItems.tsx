import { buttonVariants } from "@/components/ui/button";
import { dateFormatter, formatCurrency } from "@/lib/utils";
import { Order, OrderItem, Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

interface Props {
  order: Order & { items: (OrderItem & { product: Product })[] };
}

function OrdersItems({ order }: Props) {
  return (
    <Fragment>
      {order.items.map((item) => (
        <li
          key={item.product.id}
          className="flex max-w-[620px] flex-col items-center gap-8 py-8 md:flex-row"
        >
          <Image
            src={item.product.images[0]}
            width={80}
            height={80}
            alt={item.product.name}
            className="rounded"
          />
          <div className="flex h-full flex-col gap-1">
            <h3 className="line-clamp-1 text-body font-medium">
              {item.product.name}
            </h3>
            <p className="text-xs font-medium text-neutral-black-500">
              Ordered on: {dateFormatter(order.createdAt)}
            </p>
            <p className="text-xs font-medium">
              {formatCurrency(item.product.price)}
            </p>
          </div>
          <p className="text-body font-medium capitalize underline md:ml-auto">
            {order.status}
          </p>
          <Link
            href={`/products/${item.product.id}`}
            className={buttonVariants({ variant: "outline" })}
          >
            View item
          </Link>
        </li>
      ))}
    </Fragment>
  );
}

export default OrdersItems;
