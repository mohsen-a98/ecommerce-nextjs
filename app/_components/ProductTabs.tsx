import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import prisma from "@/prisma/prisma";
import ProductCard from "./ProductCard";
import { ReactNode } from "react";
import { addBlurDataURLsToProducts } from "@/lib/actions";

async function ProductTabs() {
  const featuredProducts = await prisma.product.findMany({
    take: 4,
    skip: 10,
  });

  const latestProducts = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 4,
  });

  if (featuredProducts.length === 0 || latestProducts.length === 0) return null;

  const featuredProductsWithBlurDataUrl =
    await addBlurDataURLsToProducts(featuredProducts);

  const latestProductsWithBlurDataUrl =
    await addBlurDataURLsToProducts(latestProducts);

  return (
    <section className="container mt-36">
      <Tabs defaultValue="featured" className="text-center">
        <TabsList className="bg-transparent">
          <TabsTrigger
            value="featured"
            className="transition-none data-[state=active]:rounded-full data-[state=active]:border"
          >
            Featured
          </TabsTrigger>
          <TabsTrigger
            value="latest"
            className="transition-none data-[state=active]:rounded-full data-[state=active]:border"
          >
            Latest
          </TabsTrigger>
        </TabsList>
        <TabsContent value="featured">
          <ProductsList>
            {featuredProductsWithBlurDataUrl.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ProductsList>
        </TabsContent>
        <TabsContent value="latest">
          <ProductsList>
            {latestProductsWithBlurDataUrl.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ProductsList>
        </TabsContent>
      </Tabs>
    </section>
  );
}

export default ProductTabs;

function ProductsList({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 justify-items-center gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {children}
    </div>
  );
}
