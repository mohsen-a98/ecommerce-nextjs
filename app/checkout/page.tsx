import { Fragment } from "react";
import BreadCrumbComponent from "../_components/BreadCrumbComponent";
import OrderDetails from "./OrderDetails";
async function page() {

  return (
    <Fragment>
      <div className="container flex flex-col gap-2 bg-neutral-white-200 px-12 py-8">
        <h1 className="text-2xl font-bold">Checkout</h1>
        <BreadCrumbComponent />
      </div>
      <div className="container flex flex-col gap-10 py-14 lg:flex-row lg:justify-between lg:gap-0">
        <div className="flex flex-col gap-16">
          <h2 className="text-base font-semibold">Shipping Address</h2>
          <div>address form</div>
        </div>
        <div className="h-px w-full bg-neutral-white-400 lg:h-[70vh] lg:w-px"></div>
        <OrderDetails />
      </div>
    </Fragment>
  );
}

export default page;
