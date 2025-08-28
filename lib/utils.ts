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
  const percentageFixed = Math.round(percentage);
  console.log("Function: Percentage: ", percentageFixed);
  return percentageFixed;
};

export const getThirstyPlants = (plants: Plant[], percentage: number) => {
  const thirstyPlants = plants
    ?.map((plant: Plant) => {
      const wateringFrequency =
        plant.wateringFrequencyOverride ??
        plant.species?.wateringFrequencyDays ??
        0;

      const hydrationPercentage = getHydrationPercentage(
        plant.daysSinceLastWatering ?? -1,
        wateringFrequency
      );

      return { plant, hydrationPercentage };
    })
    .filter(({ hydrationPercentage }) => hydrationPercentage < percentage)
    .sort((a, b) => a.hydrationPercentage - b.hydrationPercentage)
    .map(({ plant }) => plant);

  return thirstyPlants;
};
