import { SearchParams } from "@/lib/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useMemo, useCallback } from "react";
import { useDebounce } from "use-debounce";

function useUrlQuery(
  initialQuery: SearchParams = {},
): [SearchParams, (newParams: SearchParams, removeParams?: string[]) => void] {
  const [query, setQuery] = useState<SearchParams>(initialQuery);
  const [debouncedQuery] = useDebounce(query, 300);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const currentQuery = useMemo(() => {
    return Object.fromEntries(searchParams.entries());
  }, [searchParams]);

  useEffect(() => {
    setQuery(currentQuery);
  }, [currentQuery]);

  useEffect(() => {
    const url = `${pathname}?${new URLSearchParams(debouncedQuery as any).toString()}`;
    replace(url, { scroll: false });
  }, [debouncedQuery, pathname, replace]);

  const updateUrlParams = useCallback(
    (newParams: SearchParams, removeParams: string[] = []) => {
      const mergedParams = { ...query, ...newParams };
      removeParams.forEach((param) => delete mergedParams[param]);

      const filteredParams = Object.fromEntries(
        Object.entries(mergedParams)
          .map(([key, value]) => {
            if (Array.isArray(value)) {
              return [key, value.join(",")];
            }
            return [key, value ?? ""];
          })
          .filter(([_, value]) => value !== ""),
      ) as SearchParams;

      setQuery(filteredParams);
    },
    [query],
  );

  return [query, updateUrlParams];
}

export default useUrlQuery;
