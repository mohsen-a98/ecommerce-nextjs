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

/**
 * fetchWithCacheAndExpiration
 */
interface CacheItem<T> {
  data: T;
  timestamp: number;
}

type FetchFunction<T> = () => Promise<T>;

const cacheWithExpiration = new Map<string, CacheItem<any>>();

export async function fetchWithCacheAndExpiration<T>(
  key: string,
  fetchFunction: FetchFunction<T>,
  expirationTime: number = 1000 * 60 * 10, // 10 minutes,
) {
  const cached = cacheWithExpiration.get(key);

  if (cached && Date.now() - cached.timestamp < expirationTime) {
    return cached.data;
  }

  const data = await fetchFunction();

  cacheWithExpiration.set(key, {
    data,
    timestamp: Date.now(),
  });

  return data;
}
