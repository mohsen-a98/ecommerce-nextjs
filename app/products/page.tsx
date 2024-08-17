import FilterSidebar from "../_components/FilterSidebar";

function page() {
  return (
    <div className="container grid grid-cols-1 gap-5 md:grid-cols-12">
      <div className="hidden md:col-span-3 md:block">
        <FilterSidebar />
      </div>
      <div className="md:col-span-9">
      </div>
    </div>
  );
}

export default page;
