import LogoSvg from "@/public/assets/logo.svg";

function Logo({ className }: { className?: string }) {
  return (
    <div className={className}>
      <LogoSvg className="size-full" />
    </div>
  );
}

export default Logo;
