import { PRODUCTS_PER_PAGE } from "@/lib/constant";
import { SearchParams } from "@/lib/types";
import prisma from "@/prisma/prisma";
import { Prisma } from "@prisma/client";
import ProductCard from "./ProductCard";
import SortProducts from "./SortProducts";
import PaginationComponent from "./PaginationComponent";

async function ProductsList({ searchParams }: { searchParams: SearchParams }) {
  const currentPage = Number(searchParams?.page) || 1;
  const minPriceFilter = searchParams?.minPrice || 0;
  const maxPriceFilter = searchParams?.maxPrice || 100;
  const sortBy = searchParams?.sortBy || "newest";
  const categoriesFilter =
    typeof searchParams?.category === "string"
      ? searchParams.category.split("&")
      : [];

  const categoriesIds = await Promise.all(
    categoriesFilter.map(async (category) => {
      const categoryData = await prisma.category.findFirst({
        where: {
          name: category,
        },
      });
      return categoryData?.id;
    }),
  ).then((ids) => ids.filter((id) => id !== undefined));

  const orderBy = () => {
    switch (sortBy) {
      case "price-asc":
        return { price: "asc" as Prisma.SortOrder };
      case "price-desc":
        return { price: "desc" as Prisma.SortOrder };
      case "newest":
        return { createdAt: "desc" as Prisma.SortOrder };
      case "oldest":
        return { createdAt: "asc" as Prisma.SortOrder };
      default:
        return { createdAt: "desc" as Prisma.SortOrder };
    }
  };

  const productsCount = await prisma.product.count({
    where: {
      price: {
        gte: Number(minPriceFilter),
        lte: Number(maxPriceFilter),
      },
      categoryId: {
        in: categoriesIds.length > 0 ? categoriesIds : undefined,
      },
    },
  });

  const totalPages = Math.ceil(productsCount / PRODUCTS_PER_PAGE);

  const adjustedCurrentPage = Math.max(1, Math.min(currentPage, totalPages));

  const products = await prisma.product.findMany({
    skip: PRODUCTS_PER_PAGE * (adjustedCurrentPage - 1),
    take: PRODUCTS_PER_PAGE,
    where: {
      price: {
        gte: Number(minPriceFilter),
        lte: Number(maxPriceFilter),
      },
      categoryId: {
        in: categoriesIds.length > 0 ? categoriesIds : undefined,
      },
    },
    orderBy: orderBy(),
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-center justify-between gap-5 px-3 sm:flex-row">
        <p className="order-1 sm:order-first">
          Showing {(adjustedCurrentPage - 1) * PRODUCTS_PER_PAGE + 1}-
          {totalPages === currentPage
            ? productsCount
            : adjustedCurrentPage * PRODUCTS_PER_PAGE}{" "}
          of {productsCount} results
        </p>
        <SortProducts />
      </div>
      <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>

      <PaginationComponent
        options={{
          totalPages,
          currentPage,
        }}
      />
    </div>
  );
}

export default ProductsList;
