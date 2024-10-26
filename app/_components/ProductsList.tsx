import { PRODUCTS_PER_PAGE } from "@/lib/constant";
import { SearchParams } from "@/lib/types";
import ProductCard from "./ProductCard";
import SortProducts from "./SortProducts";
import PaginationComponent from "./PaginationComponent";
import { getProductsBySearchParams } from "@/lib/actions";

async function ProductsList({ searchParams }: { searchParams: SearchParams }) {
  const data = await getProductsBySearchParams(searchParams);

  const {
    products,
    productsCount,
    totalPages,
    currentPage,
    adjustedCurrentPage,
  } = data;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-center justify-between gap-5 px-3 sm:flex-row">
        {productsCount > 0 && (
          <p className="order-1 sm:order-first">
            Showing {(adjustedCurrentPage - 1) * PRODUCTS_PER_PAGE + 1}-
            {totalPages === currentPage
              ? productsCount
              : adjustedCurrentPage * PRODUCTS_PER_PAGE}{" "}
            of {productsCount} results
          </p>
        )}
        {productsCount > 0 && <SortProducts />}
      </div>

      {productsCount > 0 ? (
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products?.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-lg">No products found</p>
      )}

      {totalPages > 1 && (
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
