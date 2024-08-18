"use client";
import { Slider } from "@/components/ui/slider";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

function FilterByPriceRange() {
  const defaultValue = [0, 50];
  const [priceRange, setPriceRange] = useState(defaultValue);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const updateUrlParams = useDebouncedCallback((value: number[]) => {
    const params = new URLSearchParams(searchParams);
    params.set("minPrice", String(value[0]));
    params.set("maxPrice", String(value[1]));

    replace(`${pathname}?${params.toString()}`);
  }, 500);

  const handleSliderChange = (value: number[]) => {
    setPriceRange(value);
    updateUrlParams(value);
  };

  return (
    <div className="flex flex-col gap-4">
      <h4 className="text-body font-medium">Price</h4>
      <Slider
        defaultValue={defaultValue}
        max={100}
        min={0}
        step={1}
        onValueChange={handleSliderChange}
      />
      <div className="text-body">
        Selected Range: {priceRange[0]} - {priceRange[1]}
      </div>
    </div>
  );
}

export default FilterByPriceRange;
