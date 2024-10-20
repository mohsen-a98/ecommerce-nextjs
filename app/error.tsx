"use client"; // Error components must be Client Components

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("An error occurred:", error);
  }, [error]);

  return (
    <div className="container grid place-items-center space-y-3 border-y py-40">
      <h2 className="mb-4 text-center text-2xl font-bold">
        Oops! Something went wrong.
      </h2>
      <p className="text-center text-lg text-neutral-700">
        Thank you for your understanding. Please try again later.
      </p>
      <Button onClick={() => reset()} className="mt-4">
        Try Again
      </Button>
    </div>
  );
}
