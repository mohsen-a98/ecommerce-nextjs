import { Skeleton } from "@/components/ui/skeleton";

function ProductTabsSkeleton() {
  return (
    <div className="container mt-36">
      <div className="mx-auto flex items-center justify-center gap-1">
        <Skeleton className="h-9 w-[85px] rounded-full" />
        <Skeleton className="h-9 w-[85px] rounded-full" />
      </div>
      <div className="mt-10 grid grid-cols-1 justify-items-center gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton className="h-[400px] w-full" key={index} />
        ))}
      </div>
    </div>
  );
}

export default ProductTabsSkeleton;
