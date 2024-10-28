import prisma from "@/prisma/prisma";
import ProductCard from "./ProductCard";
import { addBlurDataURLsToProducts } from "@/lib/actions";

async function SimilarProducts({ categoryId }: { categoryId: number }) {
  const similarProducts = await prisma.product.findMany({
    where: {
      categoryId,
    },
  });

  if (similarProducts.length === 0) return null;

  const similarProductsWithBlurDataUrl =
    await addBlurDataURLsToProducts(similarProducts);

  return (
    <section className="container py-16">
      <h3 className="capitalize">You might also like</h3>
      <p className="mt-2 text-sm text-muted-foreground">SIMILAR PRODUCTS</p>
      <div className="mt-10 grid grid-cols-1 justify-items-center gap-5 sm:grid-cols-2 lg:grid-cols-4 [&>div]:p-0">
        {similarProductsWithBlurDataUrl.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default SimilarProducts;
