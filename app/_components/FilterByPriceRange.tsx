"use client";
import { Slider } from "@/components/ui/slider";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import useUrlQuery from "../_hooks/useUrlQuery";

function FilterByPriceRange() {
  const [query, setQuery] = useUrlQuery();
  const defaultValue = [0, 50];
  const [priceRange, setPriceRange] = useState(defaultValue);

  useEffect(
    function () {
      if (query.minPrice && query.maxPrice) {
        setPriceRange([Number(query.minPrice), Number(query.maxPrice)]);
      }
    },
    [query.minPrice, query.maxPrice],
  );

  const updateUrlParams = useDebouncedCallback((value: number[]) => {
    setQuery({
      minPrice: String(value[0]),
      maxPrice: String(value[1]),
      page: "1",
    });
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
        value={priceRange}
      />
      <div className="text-body">
        Selected Range: {priceRange[0]} - {priceRange[1]}
      </div>
    </div>
  );
}

export default FilterByPriceRange;
