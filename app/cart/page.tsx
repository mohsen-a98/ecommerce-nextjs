import { Metadata } from "next";
import CartList from "./CartList";
import OrderSummary from "./OrderSummary";

export const metadata: Metadata = {
  title: "Cart",
};

function page() {
  return (
    <section className="container flex flex-col justify-between gap-10 border-b border-neutral-white-400 py-14 lg:flex-row lg:gap-0">
      <div className="flex max-w-[626px] grow flex-col gap-4">
        <h2 className="text-base font-semibold">Your cart</h2>
        <div className="w-full border-b border-neutral-white-400"></div>
        <CartList />
      </div>

      <OrderSummary />
    </section>
  );
}

export default page;
