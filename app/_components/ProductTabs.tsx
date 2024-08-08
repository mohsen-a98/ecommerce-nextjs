import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import prisma from "@/prisma/prisma";
import ProductCard from "./ProductCard";
import { ReactNode } from "react";

async function ProductTabs() {
  const featuredProducts = await prisma.product.findMany({
    where: {
      id: {
        in: [10, 20, 30, 40],
      },
    },
  });

  const latestProducts = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 4,
  });

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
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ProductsList>
        </TabsContent>
        <TabsContent value="latest">
          <ProductsList>
            {latestProducts.map((product) => (
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
