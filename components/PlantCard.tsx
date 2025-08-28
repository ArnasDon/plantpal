import React from "react";
import { Badge } from "./ui/badge";
import Image from "next/image";
import HydrationStatus from "./HydrationStatus";
import { cn, getHydrationPercentage } from "@/lib/utils";
import Link from "next/link";
import WaterButton from "./WaterButton";

const PlantCard = ({ plant }: { plant: Plant }) => {
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
          "bg-dark-200 shadow-plant-card relative flex flex-col gap-4 rounded-lg",
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
          <h3 className="font-fraunces text-xl font-semibold">{plant.name}</h3>
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
          {/* isolate overflow only for plant image */}
          <div className="overflow-hidden">
            <Image
              src="/images/plant-default.png"
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
