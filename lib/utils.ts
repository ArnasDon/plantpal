import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getHydrationPercentage = (
  daysSinceLastWatering: number,
  wateringFrequency: number
) => {
  if (daysSinceLastWatering === -1) {
    return 0;
  }
  const percentage = 100 - (daysSinceLastWatering / wateringFrequency) * 100;
  return Math.min(100, Math.max(0, percentage)).toFixed(0) as unknown as number;
};
