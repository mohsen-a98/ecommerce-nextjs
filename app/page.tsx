import Hero from "./_components/HomePage/Hero";
import Features from "./_components/HomePage/Features";
import BestSelling from "./_components/HomePage/BestSelling";
import CategoriesCTA from "./_components/HomePage/CategoriesCTA";
import ProductTabs from "./_components/ProductTabs";
import NewsLetter from "./_components/NewsLetter";

function Home() {
  return (
    <div>
      <Hero />
      <Features />
      <BestSelling />
      <CategoriesCTA />
      <ProductTabs />
      <NewsLetter />
    </div>
  );
}

export default Home;
