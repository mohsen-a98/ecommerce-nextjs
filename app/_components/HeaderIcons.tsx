import UserIcon from "@/public/assets/User-1.svg";
import CartIcon from "@/public/assets/Cart.svg";
import Link from "next/link";

function HeaderIcons() {
  return (
    <div className="flex items-center justify-between gap-8">
      <Link href={"/cart"}>
        <CartIcon className="size-6 cursor-pointer" />
      </Link>
      <Link href={"/profile"}>
        <UserIcon className="size-6 cursor-pointer" />
      </Link>
    </div>
  );
}

export default HeaderIcons;
