import { auth } from "@/lib/auth/auth";
import prisma from "@/prisma/prisma";
import { Fragment } from "react";
import EmptyOrders from "./EmptyOrders";
import OrdersItems from "./OrdersItems";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Dashboard | Orders",
  },
};

async function page() {
  const session = await auth();
  const userId = session?.user?.id;
  const orders = await prisma.order.findMany({
    where: {
      userId: parseInt(userId),
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  if (orders.length === 0) return <EmptyOrders />;

  return (
    <div className="flex flex-col gap-6 pl-12">
      <h2 className="text-base font-semibold">Orders</h2>
      <ul className="divide-y-bg-neutral-white-200 minimal-scrollbar flex max-h-[90vh] flex-col divide-y overflow-y-scroll md:h-[55vh]">
        {orders.map((order) => (
          <Fragment key={order.id}>
            <OrdersItems order={order} />
          </Fragment>
        ))}
      </ul>
    </div>
  );
}

export default page;
