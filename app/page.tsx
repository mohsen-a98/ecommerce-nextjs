import Hero from "./_components/HomePage/Hero";
import Features from "./_components/HomePage/Features";
import BestSelling from "./_components/HomePage/BestSelling";
import CategoriesCTA from "./_components/HomePage/CategoriesCTA";
import ProductTabs from "./_components/ProductTabs";
import NewsLetter from "./_components/NewsLetter";
import { Suspense } from "react";
import BestSellingSkeleton from "./_components/HomePage/BestSellingSkeleton";
import ProductTabsSkeleton from "./_components/ProductTabsSkeleton";

function Home() {
  return (
    <div>
      <Hero />
      <Features />
      <Suspense fallback={<BestSellingSkeleton />}>
        <BestSelling />
      </Suspense>
      <CategoriesCTA />
      <Suspense fallback={<ProductTabsSkeleton />}>
        <ProductTabs />
      </Suspense>
      <NewsLetter />
    </div>
  );
}

export default Home;
