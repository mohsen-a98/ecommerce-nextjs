import { SearchParams } from "@/lib/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function useUrlQuery(
  initialQuery: SearchParams = {},
): [SearchParams, (newParams: SearchParams, removeParams?: string[]) => void] {
  const [query, setQuery] = useState<SearchParams>(initialQuery);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    setQuery(Object.fromEntries(searchParams.entries()));
  }, [searchParams]);

  function updateUrlParams(
    newParams: SearchParams,
    removeParams: string[] = [],
  ) {
    const mergedParams = {
      ...query,
      ...newParams,
    };

    if (removeParams.length > 0) {
      for (const param of removeParams) {
        delete mergedParams[param];
      }
    }

    const filteredParams = Object.fromEntries(
      Object.entries(mergedParams)
        .map(([key, value]) => {
          if (Array.isArray(value)) {
            return [key, value.join(",")];
          }
          return [key, value ?? ""];
        })
        .filter(([_, value]) => value !== ""),
    );

    replace(`${pathname}?${new URLSearchParams(filteredParams).toString()}`, {
      scroll: false,
    });
  }

  return [query, updateUrlParams];
}

export default useUrlQuery;
