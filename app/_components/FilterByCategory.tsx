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
    const selectedCategories = Array.isArray(query.category)
      ? query.category
      : query.category
        ? query.category.split("&")
        : [];

    const isSelected = selectedCategories.includes(categoryName);
    const newCategories = isSelected
      ? selectedCategories.filter((c) => c !== categoryName)
      : [...selectedCategories, categoryName];

    const updatedQuery = {
      ...query,
      category: newCategories.length ? newCategories.join("&") : "",
      page: "1",
    };

    setQuery(updatedQuery);
  }

  function isChecked(categoryName: string) {
    return (
      typeof query.category === "string" &&
      query.category?.split("&").includes(categoryName)
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
