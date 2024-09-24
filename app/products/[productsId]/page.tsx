import BreadCrumbComponent from "@/app/_components/BreadCrumbComponent";
import prisma from "@/prisma/prisma";
import { notFound } from "next/navigation";

async function page({
  params: { productsId },
}: {
  params: { productsId: string };
}) {
  const product = await prisma.product.findUnique({
    where: {
      id: parseInt(productsId),
    },
  });

  if (!product) return notFound();

  return (
    <>
      <div className="container border-t border-t-neutral-white-200 py-4">
        <BreadCrumbComponent
          additionalPaths={[product.name]}
          pathsToRemove={[productsId]}
        />
      </div>
    </>
  );
}

export default page;
