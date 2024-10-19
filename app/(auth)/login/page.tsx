import BreadCrumbComponent from "@/app/_components/BreadCrumbComponent";
import { Fragment } from "react";
import LoginForm from "./LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

function page() {
  return (
    <Fragment>
      <div className="container flex flex-col gap-2 bg-neutral-white-200 px-12 py-8">
        <h1 className="text-2xl font-bold">Login</h1>
        <BreadCrumbComponent />
      </div>
      <div className="container flex items-center justify-center border-b border-b-neutral-white-400 py-32">
        <LoginForm />
      </div>
    </Fragment>
  );
}

export default page;
