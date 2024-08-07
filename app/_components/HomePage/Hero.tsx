import { Button } from "@/components/ui/button";
import ArrowRightIcon from "@/public/assets/Arrow Right.svg";
import Link from "next/link";

function Hero() {
  return (
    <div className="container h-96 max-h-[440px] max-w-[1440px] bg-[url('/assets/images/hero.jpeg')] bg-cover bg-right py-12 sm:py-24 md:py-28 lg:py-28">
      <h1 className="text-3xl lg:text-4xl">Fresh Arrivals Online</h1>
      <p className="mt-2 text-body text-muted-foreground">
        Discover Our Newest Collection Today.
      </p>
      <Link href={"/#"} className="mt-12 block">
        <Button>
          View Collection <ArrowRightIcon className="*:fill-current" />
        </Button>
      </Link>
    </div>
  );
}

export default Hero;
