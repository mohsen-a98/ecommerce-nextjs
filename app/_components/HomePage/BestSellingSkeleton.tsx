import { Skeleton } from "@/components/ui/skeleton";

function BestSellingSkeleton() {
  return (
    <div className="container pb-32 pt-16">
      <Skeleton className="mx-auto h-9 w-36" />
      <div className="mt-10 grid grid-cols-1 justify-items-center gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton className="h-[400px] w-full" key={index} />
        ))}
      </div>
    </div>
  );
}

export default BestSellingSkeleton;
