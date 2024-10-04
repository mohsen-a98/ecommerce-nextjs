import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EmptyStarIcon from "@/public/assets/Empty Star.svg";
import MoreIcon from "@/public/assets/More.svg";
import { Product } from "@prisma/client";

interface Props {
  product: Product;
}

async function ProductInfoTabs({ product }: Props) {
  const isAuthenticated = true;

  return (
    <Tabs defaultValue="details" className="md:flex md:gap-8">
      <TabsList className="mb-7 flex gap-2 bg-transparent md:mb-0 md:flex-col md:justify-start [&>button]:md:w-60 [&>button]:md:items-center [&>button]:md:justify-start">
        <TabsTrigger
          value="details"
          className="gap-1 data-[state=active]:bg-neutral-white-200"
        >
          <MoreIcon className="size-6" />
          Details
        </TabsTrigger>

        <TabsTrigger
          value="reviews"
          className="gap-1 data-[state=active]:bg-neutral-white-200"
        >
          <EmptyStarIcon className="size-6" />
          Reviews
        </TabsTrigger>
      </TabsList>

      <TabsContent value="details" className="space-y-2">
        <h5>Details</h5>
        <p className="text-justify text-muted-foreground">
          {product.description}
        </p>
      </TabsContent>

      <TabsContent value="reviews" className="w-full">
        <h5>Reviews</h5>

        <div className="mt-3">
          <span className="text-3xl font-bold">4.2</span>{" "}
          <span className="text-muted-foreground">— 54 reviews</span>
        </div>

        {isAuthenticated && (
          <div className="mt-7">
            <div>write review</div>
          </div>
        )}

        <div className="[&>button]:ml-auto">
          <div>sort by</div>
        </div>

        <div className="mt-1 border-b"></div>
        <div>reviews list</div>
      </TabsContent>
    </Tabs>
  );
}

export default ProductInfoTabs;
