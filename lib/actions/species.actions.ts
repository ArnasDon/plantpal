"use server";
import { prisma } from "@/lib/prisma-client";

export const createSpecies = async (formData: SpeciesForm) => {
  try {
    const species = await getSpeciesByName(formData.name);
    if (species) {
      return { success: false, error: "Species already exists" };
    }

    const newSpecies = await prisma.species.create({
      data: {
        id: crypto.randomUUID(),
        name: formData.name,
        tips: JSON.stringify(formData.tips),
        wateringFrequencyDays: formData.wateringFrequencyDays,
      },
    });

    return { success: true, data: newSpecies };
  } catch (error) {
    console.error(error);
    return { success: false, error: error };
  }
};

export const getSpecies = async () => {
  const species = await prisma.species.findMany();
  return species as Species[];
};

export const getSpeciesByName = async (name: string) => {
  try {
    const species = await prisma.species.findFirst({
      where: { name: { contains: name, mode: "insensitive" } },
    });
    return species;
  } catch (error) {
    console.error(error);
    return { error: "Failed to get species" };
  }
};
