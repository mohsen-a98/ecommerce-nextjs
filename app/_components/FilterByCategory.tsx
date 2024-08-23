"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Category } from "@prisma/client";
import useUrlQuery from "../_hooks/useUrlQuery";

interface Props {
  categories: Category[];
}

function FilterByCategory({ categories }: Props) {
  const [query, setQuery] = useUrlQuery();

  function handleCheckboxChange(categoryName: string) {
    let selectedCategories: string[] = [];

    if (Array.isArray(query.category)) selectedCategories = query.category;
    else if (typeof query.category === "string")
      selectedCategories = query.category.split("&");

    if (selectedCategories.includes(categoryName)) {
      selectedCategories = selectedCategories.filter(
        (category) => category !== categoryName,
      );
    } else {
      selectedCategories.push(categoryName);
    }

    if (selectedCategories.length > 0) {
      setQuery({
        category: selectedCategories.join("&"),
        page: "1",
      });
    } else {
      setQuery({}, ["category"]);
    }
  }

  function isChecked(categoryName: string) {
    return (
      (typeof query.category === "string" &&
        query.category?.split("&").includes(categoryName)) ||
      false
    );
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
