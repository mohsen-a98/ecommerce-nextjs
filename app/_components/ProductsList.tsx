"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { getProductsBySearchParams } from "@/lib/actions";
import { PRODUCTS_PER_PAGE } from "@/lib/constant";
import { Product } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import PaginationComponent from "./PaginationComponent";
import ProductCard from "./ProductCard";
import SortProducts from "./SortProducts";

interface Data {
  products: (Product & { blurDataURL: string })[];
  productsCount: number;
  totalPages: number;
  currentPage: number;
  adjustedCurrentPage: number;
}

function ProductsList() {
  const searchParams = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());
  const initialData: Data = {
    products: [],
    productsCount: 0,
    totalPages: 0,
    currentPage: 1,
    adjustedCurrentPage: 1,
  };
  const [data, setData] = useState<Data>(initialData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const result = await getProductsBySearchParams(params);

      setData(result);
      setIsLoading(false);
    }

    getData();
  }, [JSON.stringify(params)]);

  const {
    products,
    productsCount,
    totalPages,
    currentPage,
    adjustedCurrentPage,
  } = data;

  if (!isLoading && productsCount === 0) {
    return <p className="mt-10 py-10 text-center text-lg">No Products</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-center justify-between gap-5 px-3 sm:flex-row">
        {!isLoading && productsCount > 0 ? (
          <p className="order-1 sm:order-first">
            Showing {(adjustedCurrentPage - 1) * PRODUCTS_PER_PAGE + 1}-
            {totalPages === currentPage
              ? productsCount
              : adjustedCurrentPage * PRODUCTS_PER_PAGE}{" "}
            of {productsCount} results
          </p>
        ) : (
          <Skeleton className="order-last h-8 w-52 sm:order-first" />
        )}
        {!isLoading && productsCount > 0 ? (
          <SortProducts />
        ) : (
          <Skeleton className="h-8 w-[120px]" />
        )}
      </div>

      {isLoading ? (
        <ProductsListSkeleton />
      ) : (
        <Suspense fallback={<ProductsListSkeleton />}>
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products?.map((product) => (
              <li key={product.id}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        </Suspense>
      )}

      {!isLoading && totalPages > 1 && (
        <PaginationComponent
          options={{
            totalPages,
            currentPage,
          }}
        />
      )}
    </div>
  );
}

export default ProductsList;

function ProductsListSkeleton() {
  return (
    <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <li key={index}>
          <Skeleton className="h-[400px] w-full" />
        </li>
      ))}
    </ul>
  );
}
