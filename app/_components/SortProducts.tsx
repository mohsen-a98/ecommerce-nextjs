"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useUrlQuery from "../_hooks/useUrlQuery";

const sortOptions = [
  { value: "price-asc", label: "Price (Low to High)" },
  { value: "price-desc", label: "Price (High to Low)" },
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
];

function SortProducts() {
  const [query, setQuery] = useUrlQuery();

  function handleSortChange(value: string) {
    setQuery({
      sortBy: value,
    });
  }

  return (
    <Select onValueChange={handleSortChange} value={query.sortBy?.toString()}>
      <SelectTrigger className="w-[120px] border-none focus:ring-0">
        <SelectValue placeholder="SORT BY" className="text-sm" />
      </SelectTrigger>
      <SelectContent>
        {sortOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default SortProducts;
