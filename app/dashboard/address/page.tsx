import AddressForm from "@/app/checkout/AddressForm";
import { auth } from "@/lib/auth/auth";
import prisma from "@/prisma/prisma";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Address",
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
    <div className="flex flex-col gap-6 pl-12">
      <h2 className="text-base font-semibold">Shipping Address</h2>
      <div className="lg:w-[535px]">
        <AddressForm address={address.at(0)} isCheckout={false} />
      </div>
    </div>
  );
}

export default page;
