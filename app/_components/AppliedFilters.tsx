import { Badge } from "@/components/ui/badge";
import { SearchParams } from "@/lib/types";

function AppliedFilters({ searchParams }: { searchParams: SearchParams }) {
  const categories =
    typeof searchParams.category === "string"
      ? searchParams.category.split("&")
      : [];
  const minPrice = searchParams.minPrice;
  const maxPrice = searchParams.maxPrice;

  return (
    <div className="hidden flex-col gap-3 px-3 md:flex">
      <h4 className="text-body font-medium">Applied Filters:</h4>
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
    </div>
  );
}

export default AppliedFilters;
