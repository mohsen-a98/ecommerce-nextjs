import { Fragment } from "react";
import BreadCrumbComponent from "../_components/BreadCrumbComponent";
import OrderDetails from "./OrderDetails";
import AddressForm from "./AddressForm";
import prisma from "@/prisma/prisma";
import { auth } from "@/lib/auth/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout",
};

async function page() {
  const session = await auth();
  const userId = session?.user?.id;
  const address = await prisma.address.findMany({
    where: {
      userId: parseInt(userId),
    },
  });

  return (
    <Fragment>
      <div className="container flex flex-col gap-2 bg-neutral-white-200 px-12 py-8">
        <h1 className="text-2xl font-bold">Checkout</h1>
        <BreadCrumbComponent />
      </div>
      <div className="container flex flex-col gap-10 py-14 md:flex-row md:gap-5">
        <div className="flex grow flex-col gap-16">
          <h2 className="text-base font-semibold">Shipping Address</h2>
          <div className="max-w-[536px]">
            <AddressForm address={address.at(0)} isCheckout={true} />
          </div>
        </div>
        <div className="h-px w-full bg-neutral-white-400 md:h-[60vh] md:w-px xl:mr-20 2xl:mr-32"></div>
        <OrderDetails />
      </div>
    </Fragment>
  );
}

export default page;
