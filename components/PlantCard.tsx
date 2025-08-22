"use client";
import React from "react";
import { Badge } from "./ui/badge";
import Image from "next/image";
import { Button } from "./ui/button";
import HydrationStatus from "./HydrationStatus";
import { waterPlant } from "@/lib/actions/plant.actions";
import { getHydrationPercentage } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

const PlantCard = ({ plant }: { plant: Plant }) => {
  const path = usePathname();

  const handleWaterPlant = async () => {
    const result = await waterPlant(plant.id, path);
    toast.custom((t) => (
      <div className="bg-primary rounded-lg p-4 shadow-plant-card flex flex-col gap-4 overflow-hidden">
        <h3 className="font-semibold">Plant watered successfully</h3>
      </div>
    ));
  };

  let hydrationPercentage = 0;

  if (plant.daysSinceLastWatering !== null) {
    hydrationPercentage = getHydrationPercentage(
      plant.daysSinceLastWatering || 0,
      plant.wateringFrequencyOverride ||
        plant.species?.wateringFrequencyDays ||
        0
    );
  }

  return (
    <div className="relative bg-dark-200 rounded-lg p-4 shadow-plant-card flex flex-col gap-4 overflow-hidden">
      <Badge className="bg-dark-400 text-light-200">
        {plant.species?.name}
      </Badge>
      <h3 className="text-xl font-semibold font-fraunces">{plant.name}</h3>
      {plant.daysSinceLastWatering !== null ? (
        <p className="text-dark-600">
          Days since last watered:{" "}
          <span className="text-white">{plant.daysSinceLastWatering} Days</span>
        </p>
      ) : (
        <p className="text-dark-600">No watering logs yet</p>
      )}
      <div className="flex flex-row">
        <div className="flex flex-col gap-12 justify-end">
          <HydrationStatus value={hydrationPercentage} className="" />
          <Button onClick={() => handleWaterPlant()}>
            <Image
              src="/icons/water.svg"
              alt="Watering can"
              width={14}
              height={14}
            />
            <p>Mark as Watered</p>
          </Button>
        </div>
        <Image
          src="/images/plant-default.png"
          alt="Plant"
          width={160}
          height={200}
          className="self-end -mb-10 -mr-10"
        />
      </div>
    </div>
  );
};

export default PlantCard;
