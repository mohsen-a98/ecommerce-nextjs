import { Button } from "@/components/ui/button";
import Link from "next/link";
import ArrowRightIcon from "@/public/assets/Arrow Right.svg";
import BreadCrumbComponent from "@/app/_components/BreadCrumbComponent";
import FailedIcon from "@/public/assets/failed.svg";

function page() {
  return (
    <div className="container">
      <div className="flex flex-col gap-2 bg-semantic-red-100 px-12 py-8">
        <h1 className="text-2xl font-bold">Failed Order</h1>
        <BreadCrumbComponent />
      </div>
      <div className="flex flex-col items-center justify-center gap-4 border-b border-b-neutral-white-400 py-24">
        <div className="size-40">
          <FailedIcon />
        </div>
        <h2 className="mt-1 text-center text-2xl font-bold text-neutral-black-900">
          Oops! There was an issue
        </h2>
        <p className="max-w-[380px] text-center text-body text-neutral-black-500">
          Oops! There was a problem processing your order. Please review the
          details and try again.
        </p>
        <Link href="/checkout">
          <Button className="mt-8 text-body font-medium text-neutral-white-900">
            <span>Reorder</span>
            <span>
              <ArrowRightIcon className="*:fill-current" />
            </span>
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default page;
