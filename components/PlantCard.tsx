"use client";
import React from "react";
import { Badge } from "./ui/badge";
import HydrationStatus from "./HydrationStatus";
import { cn, getHydrationPercentage } from "@/lib/utils";
import Link from "next/link";
import WaterButton from "./WaterButton";
import PlantImage from "./PlantImage";

const PlantCard = ({ plant }: { plant: Plant }) => {
  let hydrationPercentage = 0;

  // Not sure if the fix won't break this
  if (plant.daysSinceLastWatering !== null) {
    hydrationPercentage = getHydrationPercentage(
      plant.daysSinceLastWatering!,
      plant.wateringFrequencyOverride!
    );
  }

  const needsWatering = hydrationPercentage < 1;

  return (
    <Link href={`/plants/${plant.id}`}>
      <div
        className={cn(
          "plant-card",
          needsWatering && "border-destructive-200 border-2"
        )}
      >
        {needsWatering && (
          <Badge className="badge-water-today absolute -top-3 right-3">
            Water Today
          </Badge>
        )}
        <div className="flex flex-col gap-4 p-6">
          <Badge className="badge-species">{plant.species?.name}</Badge>
          <h3>{plant.name}</h3>
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
          <div className="mb-6 flex flex-col justify-end gap-12">
            <HydrationStatus value={hydrationPercentage} />
            <WaterButton plantId={plant.id} />
          </div>
          {/* isolate overflow only for plant image to add a nice effect */}
          <div className="overflow-hidden">
            <PlantImage
              src={plant.imageUrl}
              alt="Plant"
              width={160}
              height={200}
              className="-mr-5 -mb-20 self-end"
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PlantCard;
