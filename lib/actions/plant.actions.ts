"use server";

import { prisma } from "@/lib/prisma-client";
import { getUser } from "./auth.actions";
import { revalidatePath } from "next/cache";

export const createPlant = async (formData: PlantForm) => {
  const user = await getUser();
  if (!user) {
    return { error: "User not found" };
  }
  const userId = user.id;

  const plant = await prisma.plant.create({
    data: {
      id: crypto.randomUUID(),
      userId: userId,
      name: formData.name,
      notes: formData.notes || undefined,
      wateringFrequencyOverride:
        formData.wateringFrequencyOverride || undefined,
      speciesId: formData.speciesId,
    },
  });
  return { success: true, data: plant };
};

export const getUserPlants = async () => {
  try {
    const user = await getUser();
    const userId = user?.id;
    const plants = await prisma.plant.findMany({
      where: { userId: userId },
      include: {
        species: true,
      },
    });

    const plantsWithHydration = await Promise.all(
      plants.map(async (plant) => {
        const daysSinceLastWatering = await getDaysSinceLastWatering(plant.id);
        return { ...plant, daysSinceLastWatering };
      })
    );

    return { success: true, data: plantsWithHydration as Plant[] };
  } catch (error) {
    return { success: false, error: error };
  }
};

export const getPlant = async (plantId: string) => {
  try {
    const user = await getUser();
    if (!user) {
      return { success: false, error: "User not found" };
    }
    const userId = user.id;
    const plant = await prisma.plant.findUnique({
      where: { id: plantId, userId: userId },
      include: {
        species: true,
      },
    });

    if (!plant) {
      return { success: false, error: "Plant not found" };
    }

    const daysSinceLastWatering = await getDaysSinceLastWatering(plantId);

    return { success: true, data: { ...plant, daysSinceLastWatering } };
  } catch (error) {
    return { success: false, error: error };
  }
};

export const waterPlant = async ({
  plantId,
  path,
}: {
  plantId: string;
  path: string;
}) => {
  try {
    const plant = await prisma.watering.create({
      data: {
        id: crypto.randomUUID(),
        plantId: plantId,
      },
    });
    revalidatePath(path);
    return { success: true, data: plant };
  } catch (error) {
    return { success: false, error: error };
  }
};

export const getDaysSinceLastWatering = async (plantId: string) => {
  const lastWatering = await prisma.watering.findFirst({
    where: { plantId: plantId },
    orderBy: { createdAt: "desc" },
  });

  if (!lastWatering) {
    return null; // Plant has never been watered
  }

  // Get only the date part (year, month, day) for both dates
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const watered = lastWatering.createdAt;
  const wateredDate = new Date(
    watered.getFullYear(),
    watered.getMonth(),
    watered.getDate()
  );

  // Calculate the difference in days, ignoring time
  const msPerDay = 1000 * 60 * 60 * 24;
  const daysSinceLastWatering = Math.floor(
    (today.getTime() - wateredDate.getTime()) / msPerDay
  );

  return daysSinceLastWatering;
};
