import { cn } from "@/lib/utils";

function Spinner({ className }: { className?: string }) {
  return (
    <div className="flex items-center justify-center">
      <div
        className={cn(
          "h-12 w-12 animate-spin rounded-full border-4 border-solid border-neutral-black-900 border-t-transparent dark:border-neutral-black-100",
          className,
        )}
      ></div>
    </div>
  );
}

export default Spinner;
