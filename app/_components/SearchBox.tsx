"use client";

import { Input } from "@/components/ui/input";
import SearchIcon from "@/public/assets/Search.svg";

function SearchBox() {
  return (
    <div className="flex items-center rounded-md border border-neutral-black-100">
      <button type="button" className="ml-3 size-6">
        <SearchIcon className="*:stroke-neutral-black-300" />
      </button>
      <Input
        placeholder="Search products"
        className="border-none text-body font-medium text-neutral-black-300 focus-visible:ring-0 focus-visible:ring-offset-0"
      />
    </div>
  );
}

export default SearchBox;
