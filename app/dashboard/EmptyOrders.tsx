import { Button } from "@/components/ui/button";
import ArrowRightIcon from "@/public/assets/Arrow Right.svg";
import EmptyStateIcon from "@/public/assets/Empty State.svg";
import Link from "next/link";

function EmptyOrders() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-6">
      <div>
        <EmptyStateIcon className="size-16" />
      </div>
      <p className="text-body text-neutral-black-500">
        Your order history is waiting to be filled.
      </p>
      <Link href="/products">
        <Button>
          <span>Start Shopping</span>
          <span>
            <ArrowRightIcon className="*:fill-current" />
          </span>
        </Button>
      </Link>
    </div>
  );
}

export default EmptyOrders;
