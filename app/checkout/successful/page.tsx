import BreadCrumbComponent from "@/app/_components/BreadCrumbComponent";
import { Button } from "@/components/ui/button";
import ArrowRightIcon from "@/public/assets/Arrow Right.svg";
import SuccessfulIcon from "@/public/assets/successful.svg";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Successful Order",
};

function page() {
  return (
    <div className="container">
      <div className="flex flex-col gap-2 bg-semantic-green-100 px-12 py-8">
        <h1 className="text-2xl font-bold">Successful Order</h1>
        <BreadCrumbComponent />
      </div>
      <div className="flex flex-col items-center justify-center gap-4 border-b border-b-neutral-white-400 py-24">
        <div className="size-40">
          <SuccessfulIcon />
        </div>
        <h2 className="mt-1 text-center text-2xl font-bold text-neutral-black-900">
          Thank you for shopping
        </h2>
        <p className="max-w-[380px] text-center text-body text-neutral-black-500">
          Your order has been successfully placed and is now being processed.
        </p>
        <Link href="/dashboard">
          <Button className="mt-8 text-body font-medium text-neutral-white-900">
            <span>Go to my account</span>
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
