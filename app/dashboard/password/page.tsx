import { auth } from "@/lib/auth/auth";
import ChangePasswordForm from "./ChangePasswordForm";
import prisma from "@/prisma/prisma";
import CreatePassword from "./CreatePassword";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Password",
};
async function page() {
  const session = await auth();
  const userId = session?.user?.id;

  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(userId),
    },
  });

  const hasPassword = user?.password ? true : false;

  return (
    <div className="flex flex-col gap-6 pl-12">
      <h2 className="text-base font-semibold">
        {hasPassword ? "Change Password" : "Create Password"}
      </h2>
      <div className="mt-12 sm:w-[350px]">
        {hasPassword ? <ChangePasswordForm /> : <CreatePassword />}
      </div>
    </div>
  );
}

export default page;
