"use client";
import React from "react";
import { Badge } from "./ui/badge";
import Image from "next/image";
import { Button } from "./ui/button";
import HydrationStatus from "./HydrationStatus";
import { waterPlant } from "@/lib/actions/plant.actions";
import { cn, getHydrationPercentage } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

const PlantCard = ({ plant }: { plant: Plant }) => {
  const path = usePathname();

  const handleWaterPlant = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const result = await waterPlant(plant.id, path);
    if (result.success) {
      toast.custom(() => (
        <div className="bg-primary rounded-lg p-4 shadow-plant-card flex flex-col gap-4 overflow-hidden">
          <h3 className="font-semibold">Plant watered successfully</h3>
        </div>
      ));
    } else {
      toast.custom(() => (
        <div className="bg-destructive rounded-lg p-4 shadow-plant-card flex flex-col gap-4 overflow-hidden">
          <h3 className="font-semibold">Plant watering failed</h3>
          <p className="text-sm">{result.error as string}</p>
        </div>
      ));
    }
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

  const needsWatering = hydrationPercentage < 1;

  return (
    <Link href={`/plants/${plant.id}`}>
      <div
        className={cn(
          "relative bg-dark-200 rounded-lg shadow-plant-card flex flex-col gap-4",
          needsWatering && "border-destructive-200 border-2"
        )}
      >
        {needsWatering && (
          <Badge className="bg-destructive-200 text-destructive-foreground absolute -top-3 right-3">
            Water Today
          </Badge>
        )}
        <div className="flex flex-col gap-4 p-6">
          <Badge className="bg-dark-400 text-light-200">
            {plant.species?.name}
          </Badge>
          <h3 className="text-xl font-semibold font-fraunces">{plant.name}</h3>
          {plant.daysSinceLastWatering !== null ? (
            <p className="text-dark-600">
              Days since last watered:{" "}
              <span className="text-white">
                {plant.daysSinceLastWatering} Days
              </span>
            </p>
          ) : (
            <p className="text-dark-600">No watering logs yet</p>
          )}
        </div>
        <div className="flex flex-row pl-6">
          <div className="flex flex-col gap-12 justify-end mb-6">
            <HydrationStatus value={hydrationPercentage} />
            <Button onClick={(e) => handleWaterPlant(e)}>
              <Image
                src="/icons/water.svg"
                alt="Watering can"
                width={14}
                height={14}
              />
              <p>Mark as Watered</p>
            </Button>
          </div>
          {/* isolate overflow only for plant image */}
          <div className="overflow-hidden">
            <Image
              src="/images/plant-default.png"
              alt="Plant"
              width={160}
              height={200}
              className="self-end -mb-20 -mr-5"
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PlantCard;
