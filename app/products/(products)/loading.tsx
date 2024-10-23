import { Skeleton } from "@/components/ui/skeleton";

function loading() {
  const products = Array.from({ length: 6 }, (_, i) => i + 1);

  return (
    <>
      <div className="container mb-8 bg-neutral-white-200 py-5">
        <Skeleton className="h-5" />
      </div>
      <div className="container grid grid-cols-1 gap-5 md:grid-cols-12">
        <div className="hidden md:col-span-3 md:block">
          <Skeleton className="h-[460px] w-full" />
        </div>
        <div className="space-y-6 md:col-span-9">
          <Skeleton className="hidden h-10 w-36 md:block" />

          <div className="flex flex-col gap-4">
            <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">
              <Skeleton className="order-last h-8 w-52 sm:order-first" />
              <Skeleton className="h-8 w-[120px]" />
            </div>
            <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <li key={product}>
                  <Skeleton className="h-[400px] w-full" />
                </li>
              ))}
            </ul>

            <Skeleton className="mx-auto h-12 w-60" />
          </div>
        </div>
      </div>
    </>
  );
}

export default loading;
