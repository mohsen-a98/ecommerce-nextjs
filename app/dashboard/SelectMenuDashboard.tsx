"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter } from "next/navigation";

const listItems = [
  { name: "Orders", href: "/dashboard" },
  { name: "Wishlist", href: "/dashboard/wishlist" },
  { name: "Address", href: "/dashboard/address" },
  { name: "Password", href: "/dashboard/password" },
  { name: "Account Detail", href: "/dashboard/account" },
];
function SelectMenuDashboard() {
  const router = useRouter();
  const pathname = usePathname();
  function handleSelectChange(value: string) {
    router.push(value);
  }

  return (
    <Select onValueChange={handleSelectChange} value={pathname}>
      <SelectTrigger className="mx-auto mt-10 flex w-48 items-center gap-3 md:hidden">
        <SelectValue placeholder="Dashboard Menu" />
      </SelectTrigger>
      <SelectContent>
        {listItems.map((item) => (
          <SelectItem
            key={item.name}
            value={item.href}
            className="flex items-center gap-3"
          >
            <span>{item.name}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default SelectMenuDashboard;
