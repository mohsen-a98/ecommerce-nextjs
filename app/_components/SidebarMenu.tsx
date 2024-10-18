import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { MenuItem } from "./Header";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SearchBox from "./SearchBox";
import { buttonVariants } from "@/components/ui/button";
import CartIcon from "@/public/assets/Cart.svg";
import UserIcon from "@/public/assets/User-1.svg";

interface Props {
  menuItems: MenuItem[];
}

function SidebarMenu({ menuItems }: Props) {
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger className="size-9">
          <Menu className="size-full" />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>

          <ul className="mt-8 flex flex-col divide-y rounded-md border">
            {menuItems.map((item) => (
              <li key={item.name} className="px-2 py-4 text-body font-medium">
                {item.href && (
                  <Link href={item.href}>
                    <SheetClose>{item.name}</SheetClose>
                  </Link>
                )}

                {item.children && (
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value={item.name} className="border-none">
                      <AccordionTrigger className="p-0 text-body font-medium hover:no-underline">
                        {item.name}
                      </AccordionTrigger>
                      <AccordionContent className="pb-0">
                        <ul className="divide-y">
                          {item.children.map((child) => (
                            <li
                              key={child.name}
                              className="ml-1 px-2 py-3 text-body font-medium [&:last-child]:pb-0"
                            >
                              {child.href && (
                                <Link href={child.href}>
                                  <SheetClose>{child.name}</SheetClose>
                                </Link>
                              )}
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-col gap-3">
            <SearchBox />
            <Link href={"/dashboard"}>
              <SheetClose
                className={`${buttonVariants({ variant: "outline" })} w-full`}
              >
                <UserIcon className="mr-2 size-5" />
                Profile
              </SheetClose>
            </Link>
            <Link href={"/cart"} className="">
              <SheetClose
                className={`${buttonVariants({ variant: "outline" })} w-full`}
              >
                <CartIcon className="mr-2 size-5" />
                Cart
              </SheetClose>
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default SidebarMenu;
