import BreadCrumbComponent from "@/app/_components/BreadCrumbComponent";
import ProductDetails from "@/app/_components/ProductDetails";
import SimilarProducts from "@/app/_components/SimilarProducts";
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
      <div className="container">
        <ProductDetails product={product} />
      </div>
      <div className="container">
        <SimilarProducts categoryId={product.categoryId} />
      </div>
    </>
  );
}

export default page;
