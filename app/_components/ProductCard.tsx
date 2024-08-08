import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
import { Product } from "@prisma/client";

interface Props {
  product: Product;
}

function ProductCard({ product }: Props) {
  return (
    <div className="flex h-[434px] w-[264px] flex-col gap-6 px-[14px] py-[16px]">
      <div className="relative h-[312px] w-[237px] overflow-hidden rounded-md">
        <Link href={`/products/${product.id}`}>
          <Image
            src={product.images[0]}
            alt={product.name}
            className="object-cover"
            fill
          />
        </Link>
      </div>
      <div className="flex flex-col gap-3">
        <p className="truncate text-body font-medium">{product.name}</p>
        <div className="flex items-center gap-4">
          <Badge className="font-medium" variant={"outline"}>
            IN STOCK
          </Badge>
          <p className="text-body">{formatCurrency(product.price)}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
