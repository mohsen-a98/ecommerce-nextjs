"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import { type CarouselApi } from "@/components/ui/carousel";
import { useEffect, useState } from "react";

interface Props {
  images: string[];
  productName: string;
}

function ProductDetailsImages({ images, productName }: Props) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="relative h-[360px] md:h-[400px] lg:h-full">
      <Carousel className="size-full [&>div]:size-full" setApi={setApi}>
        <CarouselContent className="m-0 size-full">
          {images.map((image) => (
            <CarouselItem key={image} className="relative">
              <Image
                src={image}
                alt={productName}
                fill
                className="object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 px-4 py-2">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className={`size-2 cursor-pointer rounded-full ${
              index === current - 1
                ? "bg-neutral-black-900"
                : "bg-neutral-black-100"
            }`}
            onClick={() => api?.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductDetailsImages;
