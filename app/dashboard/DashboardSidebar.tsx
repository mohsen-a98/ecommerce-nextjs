"use client";
import LogoutIcon from "@/public/assets/Logout.svg";
import { signOut } from "next-auth/react";
import DashboardSidebarItems from "./DashboardSidebarItems";

function DashboardSidebar() {
  async function handleLogout() {
    localStorage.removeItem("cart");

    await signOut();
  }

  return (
    <aside className="flex w-[275px] flex-col gap-4 border-r border-r-neutral-200 py-14 pr-9">
      <DashboardSidebarItems />
      <div className="px-6 py-2">
        <button
          type="button"
          className="flex cursor-pointer items-center gap-3"
          onClick={handleLogout}
        >
          <span className="size-6">
            <LogoutIcon />
          </span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default DashboardSidebar;
