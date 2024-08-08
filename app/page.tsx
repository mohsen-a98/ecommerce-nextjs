import Hero from "./_components/HomePage/Hero";
import Features from "./_components/HomePage/Features";
import BestSelling from "./_components/HomePage/BestSelling";
import CategoriesCTA from "./_components/HomePage/CategoriesCTA";
import ProductTabs from "./_components/ProductTabs";

function Home() {
  return (
    <div>
      <Hero />
      <Features />
      <BestSelling />
      <CategoriesCTA />
      <ProductTabs />
    </div>
  );
}

export default Home;
