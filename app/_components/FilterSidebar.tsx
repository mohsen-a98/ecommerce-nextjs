import prisma from "@/prisma/prisma";
import FilterByCategory from "./FilterByCategory";

async function FilterSidebar() {
  const categories = await prisma.category.findMany();

  return (
    <aside className="flex flex-col gap-10 rounded-md border border-neutral-black-100 py-6 pl-4 pr-8">
      <FilterByCategory categories={categories} />
    </aside>
  );
}

export default FilterSidebar;
