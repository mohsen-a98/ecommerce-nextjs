"use client";

import OrdersIcon from "@/public/assets/Cart.svg";
import HeartIcon from "@/public/assets/Heart.svg";
import DeliveryIcon from "@/public/assets/Delivery.svg";
import KeyIcon from "@/public/assets/Key.svg";
import UserIcon from "@/public/assets/User-1.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const listItems = [
  { name: "Orders", href: "/dashboard", icon: <OrdersIcon /> },
  { name: "Wishlist", href: "/dashboard/wishlist", icon: <HeartIcon /> },
  { name: "Address", href: "/dashboard/address", icon: <DeliveryIcon /> },
  { name: "Password", href: "/dashboard/password", icon: <KeyIcon /> },
  { name: "Account Detail", href: "/dashboard/account", icon: <UserIcon /> },
];

function DashboardSidebarItems() {
  const pathname = usePathname();
  return (
    <ul className="flex flex-col gap-4">
      {listItems.map((item) => (
        <li
          key={item.name}
          className={cn(
            "rounded px-6 py-2 transition-colors hover:bg-neutral-100",
            pathname === item.href && "bg-neutral-100",
          )}
        >
          <Link href={item.href} className="flex items-center gap-3">
            <span className="size-6">{item.icon}</span>
            <span className="w-max">{item.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default DashboardSidebarItems;
