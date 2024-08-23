"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams } from "next/navigation";

interface Props {
  options: {
    totalPages: number;
    currentPage: number;
  };
}

function PaginationComponent({ options: { totalPages, currentPage } }: Props) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const createPageUrl = (page: number) => {
    params.set("page", page.toString());
    return `?${params.toString()}`;
  };

  const renderPageLink = (page: number) => (
    <PaginationItem>
      <PaginationLink href={createPageUrl(page)}>{page}</PaginationLink>
    </PaginationItem>
  );

  return (
    <Pagination>
      <PaginationContent className="flex gap-2 rounded border p-1">
        {/* Previous Button */}
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious
              href={createPageUrl(currentPage - 1)}
              className="[&_span]:hidden"
            />
          </PaginationItem>
        )}

        {/* First Page and Ellipsis */}
        {currentPage > 2 && renderPageLink(1)}
        {currentPage > 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Current and surrounding pages */}
        {currentPage > 1 && renderPageLink(currentPage - 1)}
        <PaginationItem>
          <PaginationLink href="#" isActive={true}>
            {currentPage}
          </PaginationLink>
        </PaginationItem>
        {currentPage < totalPages && renderPageLink(currentPage + 1)}

        {/* Last Page and Ellipsis */}
        {currentPage < totalPages - 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {currentPage < totalPages - 1 && renderPageLink(totalPages)}

        {/* Next Button */}
        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext
              href={createPageUrl(currentPage + 1)}
              className="[&_span]:hidden"
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}

export default PaginationComponent;
