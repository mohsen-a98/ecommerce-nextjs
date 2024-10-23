import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
import { Product } from "@prisma/client";
import { getLocalBase64 } from "@/lib/getLocalBase64";

interface Props {
  product: Product;
}

async function ProductCard({ product }: Props) {
  const blurDataURL = await getLocalBase64(product.images[0]);

  return (
    <div className="flex h-[434px] w-full flex-col gap-6 px-[14px] py-[16px]">
      <div className="relative h-[312px] w-full overflow-hidden rounded-md duration-300 hover:scale-105">
        <Link href={`/products/${product.id}`}>
          <Image
            src={product.images[0]}
            alt={product.name}
            className="object-cover"
            placeholder="blur"
            blurDataURL={blurDataURL.base64}
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
