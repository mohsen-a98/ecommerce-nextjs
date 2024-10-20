import { Skeleton } from "@/components/ui/skeleton";

function loading() {
  const similarProducts = Array.from({ length: 4 }, (_, i) => i + 1);
  return (
    <>
      <div className="container border-t border-t-neutral-white-200 py-4">
        <Skeleton className="h-5 w-1/3" />
      </div>
      <div className="container">
        {/* Placeholder for ProductDetails */}
        <div className="grid h-fit grid-cols-1 gap-3 overflow-hidden rounded border md:grid-cols-2 lg:mx-auto lg:h-[450px] lg:w-full">
          {/* Placeholder for images */}
          <Skeleton className="h-full w-full" />

          <div className="flex h-full flex-col justify-around gap-6 px-5 py-3">
            <div className="flex items-center justify-between gap-3">
              {/* Placeholder for product name */}
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-6 w-6" /> {/* Placeholder for ShareIcon */}
            </div>

            <div className="flex items-center gap-4">
              <Skeleton className="h-7 w-36 rounded-full" />{" "}
              {/* Placeholder for rating */}
              <Skeleton className="h-7 w-20 rounded-full" />{" "}
              {/* Placeholder for stock badge */}
            </div>

            {/* Placeholder for price */}
            <Skeleton className="h-6 w-16" />

            {/* Placeholder for quantity selector */}
            <div className="flex flex-col gap-3">
              <Skeleton className="h-6 w-20" />
              <div className="flex w-fit items-center gap-5 rounded border">
                <Skeleton className="h-8 w-8" /> {/* Minus button */}
                <Skeleton className="h-6 w-6" /> {/* Quantity number */}
                <Skeleton className="h-8 w-8" /> {/* Plus button */}
              </div>
            </div>

            {/* Placeholder for buttons */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-5">
                <Skeleton className="h-10 w-52" /> {/* Add/Remove from cart */}
                <Skeleton className="h-10 w-10" /> {/* Wishlist icon */}
              </div>
              <Skeleton className="h-4 w-56" />{" "}
              {/* Placeholder for free shipping text */}
            </div>
          </div>
        </div>
      </div>
      <div className="container py-44">
        {/* Placeholder for ProductInfoTabs */}
        <div className="md:flex md:gap-8">
          <div className="mb-7 flex gap-2 bg-transparent md:mb-0 md:flex-col md:justify-start [&>button]:md:w-60 [&>button]:md:items-center [&>button]:md:justify-start">
            {/* Placeholder for Tabs List */}
            <Skeleton className="h-8 w-60" />
            <Skeleton className="h-8 w-60" />
          </div>

          <div className="w-full space-y-2">
            {/* Placeholder for content */}
            <Skeleton className="mb-5 h-6 w-24" />{" "}
            {/* Placeholder for 'Details' heading */}
            <Skeleton className="h-4 w-full" />{" "}
            {/* Placeholder for 'Details' text */}
            <Skeleton className="h-4 w-full" />{" "}
            {/* More description skeletons */}
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </div>
      <div className="container">
        {/* Placeholder for SimilarProducts */}
        <div className="container py-16">
          {/* placeholder for heading */}
          <Skeleton className="mb-2 h-10 w-52" />
          {/* placeholder for subheading */}
          <Skeleton className="h-6 w-32" />
          <div className="mt-10 grid grid-cols-1 justify-items-center gap-5 sm:grid-cols-2 lg:grid-cols-4 [&>div]:p-0">
            {similarProducts.slice(0, 4).map((_, index) => (
              <div
                key={index}
                className="flex h-[434px] w-full flex-col gap-6 px-[14px] py-[16px]"
              >
                <div className="relative h-[312px] w-full overflow-hidden rounded-md duration-300 hover:scale-105">
                  <Skeleton className="h-full w-full" />
                </div>
                <div className="flex flex-col gap-3">
                  <Skeleton className="h-5 w-full" />
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-5 w-24" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default loading;
