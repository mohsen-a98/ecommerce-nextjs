import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { auth } from "@/lib/auth/auth";
import AccountForm from "./AccountForm";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

function getInitials(name: string) {
  const words = name.split(" ");
  const initials = words.map((word) => word.charAt(0).toUpperCase());
  return initials.join(" ");
}

async function page() {
  const session = await auth();
  const user: User = session?.user;

  return (
    <div className="flex flex-col gap-6 pl-12">
      <h2 className="text-base font-semibold">Account Details</h2>
      <div className="mt-10 flex flex-col gap-8 sm:w-80">
        <Avatar className="size-12 rounded-full border bg-primaryPalette-100 text-primaryPalette-900">
          <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
        </Avatar>

        <AccountForm />
      </div>
    </div>
  );
}

export default page;
