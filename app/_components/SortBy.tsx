"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useUrlQuery from "../_hooks/useUrlQuery";

interface Props {
  options: { value: string; label: string }[];
}

function SortBy({ options }: Props) {
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
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default SortBy;
