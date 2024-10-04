import { Fragment } from "react";
import BreadCrumbComponent from "@/app/_components/BreadCrumbComponent";
import SignUpForm from "@/app/(auth)/sign-up/SignUpForm";

function page() {
  return (
    <Fragment>
      <div className="container flex flex-col gap-2 bg-neutral-white-200 px-12 py-8">
        <h1 className="text-2xl font-bold">Sign Up</h1>
        <BreadCrumbComponent />
      </div>
      <div className="container flex items-center justify-center border-b border-b-neutral-white-400 py-32">
        <SignUpForm />
      </div>
    </Fragment>
  );
}

export default page;
