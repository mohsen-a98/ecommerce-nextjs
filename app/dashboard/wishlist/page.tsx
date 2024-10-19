import { auth } from "@/lib/auth/auth";
import prisma from "@/prisma/prisma";
import { Fragment } from "react";
import EmptyWishlist from "./EmptyWishlist";
import WishlistItems from "./WishlistItems";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wishlist",
};

async function page() {
  const session = await auth();
  const userId = session?.user?.id;

  const wishlist = await prisma.wishlist.findMany({
    where: {
      userId: parseInt(userId),
    },
    include: {
      product: true,
    },
  });

  if (wishlist.length === 0) return <EmptyWishlist />;

  return (
    <div className="flex flex-col gap-6 pl-12">
      <h2 className="text-base font-semibold">Wishlist</h2>
      <ul className="divide-y-bg-neutral-white-200 minimal-scrollbar flex max-h-[90vh] flex-col divide-y overflow-y-scroll lg:max-h-[55vh]">
        {wishlist.map((item) => (
          <Fragment key={item.id}>
            <WishlistItems wishlist={item} />
          </Fragment>
        ))}
      </ul>
    </div>
  );
}

export default page;
