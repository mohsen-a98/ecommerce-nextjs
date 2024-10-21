"use client";

import { buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { SheetClose } from "@/components/ui/sheet";
import { search } from "@/lib/actions";
import { formatCurrency } from "@/lib/utils";
import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useState, useTransition } from "react";
import Spinner from "./Spinner";

const SearchModal = ({
  children,
  onCloseSidebar,
}: {
  children: React.ReactNode;
  onCloseSidebar?: () => void;
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [isPending, startTransition] = useTransition();

  const handleSearch = async () => {
    if (!searchTerm) return null;
    await startTransition(async () => {
      const result = await search(searchTerm);
      setResults(result);
    });
  };

  const handleClose = () => {
    setSearchTerm("");
    setResults([]);
  };

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>

      <DialogContent className="fixed left-1/2 top-1/2 w-[80vw] -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-white p-4">
        <DialogTitle className="text-xl font-bold">Search</DialogTitle>
        <DialogDescription className="mb-2 text-sm text-gray-600">
          Type to search for items
        </DialogDescription>

        <Input
          type="text"
          placeholder="Type to search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !isPending && handleSearch()}
          className="mb-2 focus-visible:ring-1 focus-visible:ring-offset-0"
        />
        <hr className="my-2" />

        {isPending ? (
          <div className="grid h-72 place-items-center">
            <Spinner />
          </div>
        ) : (
          <ul className="minimal-scrollbar flex h-72 flex-col gap-4 divide-y overflow-y-auto pr-1">
            {results.length > 0 ? (
              results.map((product) => (
                <li
                  key={product.id}
                  className="flex w-full flex-col items-center gap-4 py-4 md:flex-row"
                >
                  <Image
                    src={product.images[0]}
                    width={80}
                    height={80}
                    alt={product.name}
                    className="rounded"
                  />
                  <div className="flex h-full flex-col gap-1">
                    <h3 className="line-clamp-1 text-body font-medium">
                      {product.name}
                    </h3>
                    <p className="line-clamp-1 text-xs font-medium text-neutral-black-500">
                      {product.description}
                    </p>
                    <p className="text-xs font-medium">
                      {formatCurrency(product.price)}
                    </p>
                  </div>

                  <Link
                    href={`/products/${product.id}`}
                    className={buttonVariants({ variant: "outline" })}
                    onClick={onCloseSidebar}
                  >
                    <SheetClose>View item</SheetClose>
                  </Link>
                </li>
              ))
            ) : (
              <li className="py-1 text-center text-gray-500">
                No results found
              </li>
            )}
          </ul>
        )}

        <DialogClose className="mt-4 flex justify-end">
          <span
            role="button"
            className={buttonVariants()}
            onClick={handleClose}
          >
            Close
          </span>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default SearchModal;
