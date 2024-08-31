import LogoSvg from "@/public/assets/logo.svg";
import Link from "next/link";

function Logo({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Link href="/">
        <LogoSvg className="size-full" />
      </Link>
    </div>
  );
}

export default Logo;
