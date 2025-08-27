"use server";

import { prisma } from "@/lib/prisma-client";
import { getUserPlants } from "./plant.actions";
import { revalidatePath } from "next/cache";

export const getPlantCompanions = async (plantId: string) => {
  try {
    const companions = (await prisma.plantCompanion.findMany({
      where: {
        OR: [{ plantId: plantId }, { companionId: plantId }],
      },
      include: {
        companion: { include: { species: true } },
        plant: { include: { species: true } },
      },
    })) as PlantCompanion[];

    companions.forEach((companion) => {
      if (companion.companionId === plantId) {
        // if companionId is the plantId, we need to swap the companion and plant objects
        // we copy the companion object to a variable to avoid mutating the original object
        const companionPlant = companion.companion;
        companion.companion = companion.plant!;
        companion.plant = companionPlant;
      }
    });

    return { success: true, data: companions };
  } catch (error) {
    return { success: false, error: error };
  }
};

export const getEligibleCompanions = async (plantId: string) => {
  try {
    const companions = await getPlantCompanions(plantId);
    const userPlants = await getUserPlants();
    if (!userPlants.success) {
      return { success: false, error: userPlants.error };
    }
    const eligibleCompanions = userPlants.data?.filter(
      (plant) =>
        plant.id !== plantId &&
        !companions.data?.some(
          (companion) =>
            companion.companionId === plant.id || companion.plantId === plant.id
        )
    );
    return { success: true, data: eligibleCompanions };
  } catch (error) {
    return { success: false, error: error };
  }
};

export const addPlantCompanion = async ({
  plantId,
  companionId,
  notes,
  path,
}: {
  plantId: string;
  companionId: string;
  notes?: string;
  path: string;
}) => {
  try {
    const companion = await prisma.plantCompanion.create({
      data: {
        plantId: plantId,
        companionId: companionId,
        notes: notes,
      },
    });
    revalidatePath(path);
    return { success: true, data: companion };
  } catch (error) {
    return { success: false, error: error };
  }
};

export const deletePlantCompanion = async (
  plantId: string,
  companionId: string,
  path: string
) => {
  try {
    await prisma.plantCompanion.deleteMany({
      where: {
        OR: [
          { plantId: plantId, companionId: companionId },
          { companionId: plantId, plantId: companionId },
        ],
      },
    });
    revalidatePath(path);
    return { success: true };
  } catch (error) {
    return { success: false, error: error };
  }
};
