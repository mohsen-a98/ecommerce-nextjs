import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

interface Props {
  image: string;
  name: string;
  price: number;
}

function ProductCard({ image, name, price }: Props) {
  return (
    <div className="flex h-[434px] w-[264px] flex-col gap-6 px-[14px] py-[16px]">
      <div className="relative h-[312px] w-[237px] overflow-hidden rounded-md">
        <Image src={image} alt={name} className="object-cover" fill />
      </div>
      <div className="flex flex-col gap-3">
        <p className="truncate text-body font-medium">{name}</p>
        <div className="flex items-center gap-4">
          <Badge className="font-medium" variant={"outline"}>
            IN STOCK
          </Badge>
          <p className="text-body">{formatCurrency(price)}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
