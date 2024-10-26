import BreadCrumbComponent from "@/app/_components/BreadCrumbComponent";
import NewsLetter from "@/app/_components/NewsLetter";
import ProductDetails from "@/app/_components/ProductDetails";
import ProductInfoTabs from "@/app/_components/ProductInfoTabs";
import SimilarProducts from "@/app/_components/SimilarProducts";
import prisma from "@/prisma/prisma";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { productsId: string };
}) {
  const product = await prisma.product.findUnique({
    where: {
      id: parseInt(params.productsId),
    },
  });

  return {
    title: product?.name,
  };
}

export const revalidate = 24 * 3600; // 24 hours
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
      <div className="container py-44">
        <ProductInfoTabs product={product} />
      </div>
      <div className="container">
        <SimilarProducts categoryId={product.categoryId} />
      </div>
      <NewsLetter />
    </>
  );
}

export default page;
