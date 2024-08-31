import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

function NotFound() {
  return (
    <div className="grid place-items-center space-y-3 border-y py-40">
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/" className={buttonVariants()}>
        Return Home
      </Link>
    </div>
  );
}

export default NotFound;
