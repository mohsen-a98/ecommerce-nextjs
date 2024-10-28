"use client";
import { Badge } from "@/components/ui/badge";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Query {
  category: string;
  minPrice: string;
  maxPrice: string;
}

function AppliedFilters() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState<Query>({
    category: searchParams.get("category") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
  });

  useEffect(() => {
    const newCategory = searchParams.get("category") || "";
    const newMinPrice = searchParams.get("minPrice") || "";
    const newMaxPrice = searchParams.get("maxPrice") || "";

    setQuery((prevQuery) => {
      if (
        newCategory === prevQuery.category &&
        newMinPrice === prevQuery.minPrice &&
        newMaxPrice === prevQuery.maxPrice
      ) {
        return prevQuery;
      }

      return {
        category: newCategory,
        minPrice: newMinPrice,
        maxPrice: newMaxPrice,
      };
    });
  }, [
    searchParams.get("category"),
    searchParams.get("minPrice"),
    searchParams.get("maxPrice"),
  ]);

  const categories = query.category === "" ? [] : query.category.split("&");
  const minPrice = query.minPrice;
  const maxPrice = query.maxPrice;

  const isEmpty = categories.length === 0 && minPrice === "" && maxPrice === "";

  return (
    <div className="hidden flex-col gap-3 px-3 md:flex">
      <h4 className="text-body font-medium">Applied Filters:</h4>
      {isEmpty ? (
        <p className="ms-4 text-body">No filters applied</p>
      ) : (
        <div className="flex items-center gap-3">
          {categories.length > 0 &&
            categories.map((category) => (
              <Badge key={category} className="px-4 py-2" variant="outline">
                {category}
              </Badge>
            ))}
          {minPrice && maxPrice && (
            <Badge
              className="px-4 py-2"
              variant="outline"
            >{`Price(${minPrice} - ${maxPrice})`}</Badge>
          )}
        </div>
      )}
    </div>
  );
}

export default AppliedFilters;
