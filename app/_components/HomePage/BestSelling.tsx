import prisma from "@/prisma/prisma";
import ProductCard from "../ProductCard";
import { addBlurDataURLsToProducts } from "@/lib/actions";

async function BestSelling() {
  const bestSellingProducts = await prisma.product.findMany({
    take: 4,
    skip: 7,
  });

  const bestSellingProductsWithBlurDataUrl =
    await addBlurDataURLsToProducts(bestSellingProducts);

  return (
    <section className="container pb-32 pt-16">
      <h3 className="text-center capitalize">best selling</h3>
      <div className="mt-10 grid grid-cols-1 justify-items-center gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {bestSellingProductsWithBlurDataUrl.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default BestSelling;
