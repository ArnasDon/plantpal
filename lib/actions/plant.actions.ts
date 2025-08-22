"use server";

import { prisma } from "@/lib/prisma-client";
import { getUser } from "./auth.actions";

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
    return plants as Plant[];
  } catch (error) {
    console.error(error);
    // return { error: "Failed to get user plants" };
  }
};
