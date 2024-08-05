import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { type MenuItem } from "./Header";

interface Props {
  menuItems: MenuItem[];
}

function Navbar({ menuItems }: Props) {
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
