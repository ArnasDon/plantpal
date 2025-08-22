"use server";

import { prisma } from "@/lib/prisma-client";
import { getUser } from "./auth.actions";
import console from "console";
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
    // if (!user) {
    //   throw new Error("User not found");
    // }
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

    return plantsWithHydration as Plant[];
  } catch (error) {
    console.error(error);
    // return { error: "Failed to get user plants" };
  }
};

export const waterPlant = async (plantId: string, path: string) => {
  const user = await getUser();
  if (!user) {
    return { error: "User not found" };
  }
  const userId = user.id;
  const plant = await prisma.watering.create({
    data: {
      id: crypto.randomUUID(),
      plantId: plantId,
    },
  });
  revalidatePath(path);
  return { success: true, data: plant };
};

export const getDaysSinceLastWatering = async (plantId: string) => {
  const lastWatering = await prisma.watering.findFirst({
    where: { plantId: plantId },
    orderBy: { createdAt: "desc" },
  });

  if (!lastWatering) {
    return null; // Plant has never been watered
  }
  const daysSinceLastWatering = Math.floor(
    (new Date().getTime() - lastWatering?.createdAt.getTime()) /
      (1000 * 60 * 60 * 24)
  );
  return daysSinceLastWatering;
};
