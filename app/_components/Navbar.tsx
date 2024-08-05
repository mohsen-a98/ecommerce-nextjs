import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

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
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

function Navbar() {
  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList className="gap-2 text-body font-medium">
        {menuItems.map((item) => (
          <NavigationMenuItem key={item.name}>
            {item.href && <Link href={item.href}>{item.name}</Link>}
            {item.children && (
              <>
                <NavigationMenuTrigger>{item.name}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-3 md:w-[300px] md:grid-cols-2 lg:w-[500px]">
                    {item.children.map((child) => (
                      <li
                        key={child.name}
                        className="rounded-sm border border-neutral-300 bg-neutral-100 p-2 text-body font-medium"
                      >
                        {child.href && (
                          <Link href={child.href} className="">
                            {child.name}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default Navbar;
