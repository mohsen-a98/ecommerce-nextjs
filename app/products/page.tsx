import { SearchParams } from "@/lib/types";
import AppliedFilters from "../_components/AppliedFilters";
import FilterSidebar from "../_components/FilterSidebar";
import ProductsList from "../_components/ProductsList";
import BreadCrumbComponent from "../_components/BreadCrumbComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
};

function page({ searchParams }: { searchParams: SearchParams }) {
  return (
    <>
      <div className="container mb-8 bg-neutral-white-200 py-5">
        <BreadCrumbComponent />
      </div>
      <div className="container grid grid-cols-1 gap-5 md:grid-cols-12">
        <div className="hidden md:col-span-3 md:block">
          <FilterSidebar />
        </div>
        <div className="space-y-6 md:col-span-9">
          <AppliedFilters searchParams={searchParams} />
          <ProductsList searchParams={searchParams} />
        </div>
      </div>
    </>
  );
}

export default page;
