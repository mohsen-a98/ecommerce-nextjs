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
import React from "react";

interface Props {
  additionalPaths?: string[];
  pathsToRemove?: string[];
}

function BreadCrumbComponent({ additionalPaths, pathsToRemove }: Props) {
  const pathname = usePathname();

  let path = pathname
    .split("?")[0]
    .split("/")
    .filter((path) => path !== "");

  additionalPaths
    ? (path = ["Ecommerce", ...path, ...additionalPaths])
    : (path = ["Ecommerce", ...path]);

  if (pathsToRemove) path = path.filter((p) => !pathsToRemove.includes(p));

  return (
    <Breadcrumb>
      <BreadcrumbList className="font-medium">
        {path.map((p, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              {p === path[path.length - 1] ? (
                <BreadcrumbPage>{p}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink>{p}</BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {p !== path[path.length - 1] && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default BreadCrumbComponent;
