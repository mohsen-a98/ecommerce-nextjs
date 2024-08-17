"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Category } from "@prisma/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Props {
  categories: Category[];
}

function FilterByCategory({ categories }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleCheckboxChange(categoryName: string) {
    const params = new URLSearchParams(searchParams);
    let selectedCategories = params.get("category")?.split("&") || [];

    if (selectedCategories.includes(categoryName)) {
      selectedCategories = selectedCategories.filter(
        (category) => category !== categoryName,
      );
    } else {
      selectedCategories.push(categoryName);
    }

    if (selectedCategories.length > 0) {
      params.set("category", selectedCategories.join("&"));
    } else {
      params.delete("category");
    }

    replace(`${pathname}?${params.toString()}`);
  }

  function isChecked(categoryName: string) {
    const params = searchParams.get("category");
    return params ? params.split("&").includes(categoryName) : false;
  }

  return (
    <div>
      <h4 className="text-body font-medium">Categories</h4>
      <ul className="mt-4 text-body">
        {categories.map((category) => (
          <li
            key={category.id}
            className="flex items-center gap-2 border-b border-b-neutral-black-100 px-1 py-3"
          >
            <Checkbox
              id={String(category.id)}
              className="border-neutral-black-100"
              onClick={() => handleCheckboxChange(category.name)}
              checked={isChecked(category.name)}
            />
            <label
              htmlFor={String(category.id)}
              className="text-neutral-black-600"
            >
              {category.name}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FilterByCategory;
