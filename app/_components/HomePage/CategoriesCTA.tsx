import { Button } from "@/components/ui/button";
import ArrowRightIcon from "@/public/assets/Arrow Right.svg";
import Link from "next/link";

function CategoriesCTA() {
  return (
    <section className="h-[304px] bg-[url('/assets/images/CategoriesCTA.jpg')] bg-cover bg-right py-14">
      <div className="container">
        <h3>Browse Our Fashion Paradise!</h3>
        <p className="mt-6 max-w-[462px] text-body text-muted-foreground">
          Step into a world of style and explore our diverse collection of
          clothing categories.
        </p>
        <Button className="mt-8">
          <Link href={"/#"}>Start Browsing</Link>{" "}
          <ArrowRightIcon className="*:fill-current" />
        </Button>
      </div>
    </section>
  );
}

export default CategoriesCTA;
