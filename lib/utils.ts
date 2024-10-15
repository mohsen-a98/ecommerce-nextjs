import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(number: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number);
}

export function timeFromNow(date: Date) {
  dayjs.extend(relativeTime);
  return dayjs(date).fromNow();
}

export function dateFormatter(date: Date) {
  return new Intl.DateTimeFormat("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}
