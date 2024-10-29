import dynamic from "next/dynamic";
import HeaderIcons from "./HeaderIcons";
import Logo from "./Logo";
import Navbar from "./Navbar";
import SearchBox from "./SearchBox";
import SidebarMenu from "./SidebarMenu";
const SearchModal = dynamic(() => import("./SearchModal"), { ssr: false });

export interface MenuItem {
  name: string;
  href?: string;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  { name: "Home", href: "/" },
  {
    name: "Categories",
    children: [
      { name: "All Categories", href: "/products" },
      { name: "Clothes", href: "/products?category=clothes" },
      { name: "Electronics", href: "/products?category=electronics" },
      { name: "Furniture", href: "/products?category=furniture" },
      { name: "Shoes", href: "/products?category=shoes" },
      { name: "Miscellaneous", href: "/products?category=miscellaneous" },
    ],
  },
  { name: "About", href: "/about-us" },
  { name: "Contact", href: "/contact" },
];
function Header() {
  return (
    <header className="bg-background">
      <div className="container flex items-center justify-between px-3 py-5">
        <Logo />
        <Navbar menuItems={menuItems} />
        <div className="hidden items-center justify-between gap-8 lg:flex">
          <SearchModal>
            <SearchBox />
          </SearchModal>
          <HeaderIcons />
        </div>
        <SidebarMenu menuItems={menuItems} />
      </div>
    </header>
  );
}

export default Header;
