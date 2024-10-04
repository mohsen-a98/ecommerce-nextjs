import SortBy from "./SortBy";

const sortOptions = [
  { value: "price-asc", label: "Price (Low to High)" },
  { value: "price-desc", label: "Price (High to Low)" },
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
];

function SortProducts() {
  return <SortBy options={sortOptions} />;
}

export default SortProducts;
