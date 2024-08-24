"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

function BreadCrumbComponent() {
  const pathname = usePathname();

  const path = pathname
    .split("?")[0]
    .split("/")
    .filter((path) => path !== "");
  path.unshift("Ecommerce");

  return (
    <Breadcrumb>
      <BreadcrumbList className="font-medium">
        {path.map((p) => (
          <>
            <BreadcrumbItem key={p}>
              {p === path[path.length - 1] ? (
                <BreadcrumbPage>{p}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink>{p}</BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {p !== path[path.length - 1] && <BreadcrumbSeparator />}
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default BreadCrumbComponent;
