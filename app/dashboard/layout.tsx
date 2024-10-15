import { Fragment, ReactNode } from "react";
import BreadCrumbComponent from "../_components/BreadCrumbComponent";

function Layout({ children }: { children: ReactNode }) {
  return (
    <Fragment>
      <div className="container flex flex-col gap-2 bg-neutral-white-200 px-12 py-8">
        <h1 className="text-2xl font-bold">My Account</h1>
        <BreadCrumbComponent />
      </div>
      <div className="container flex py-14">
        <div>dashboard sidebar</div>
        <div className="w-full">{children}</div>
      </div>
    </Fragment>
  );
}

export default Layout;
