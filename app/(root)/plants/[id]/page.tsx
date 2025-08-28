import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getUser } from "@/lib/actions/auth.actions";
import { getPlant, getUserPlants } from "@/lib/actions/plant.actions";
import { getPlantCompanions } from "@/lib/actions/companion.actions";
import HydrationStatus from "@/components/HydrationStatus";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
import { cn, getHydrationPercentage } from "@/lib/utils";
import CompanionCard from "@/components/CompanionCard";
import AddCompanion from "@/components/AddCompanion";
import { getEligibleCompanions } from "@/lib/actions/companion.actions";
import WaterButton from "@/components/WaterButton";
import Link from "next/link";
import DeletePlantButton from "@/components/DeletePlantButton";

const PlantPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const user = await getUser();
  if (!user) {
    redirect("/sign-in");
  }
  const { id } = await params;
  const plant = await getPlant(id);

  const userPlants = await getUserPlants();

  const companions = await getPlantCompanions(id);
  const eligibleCompanions = await getEligibleCompanions(id);
  if (!plant.success || !userPlants.success || !eligibleCompanions.success) {
    redirect("/plants");
  }

  let hydrationPercentage = 0;

  if (plant.data?.daysSinceLastWatering !== null) {
    hydrationPercentage = getHydrationPercentage(
      plant.data?.daysSinceLastWatering || -1,
      plant.data?.wateringFrequencyOverride ||
        plant.data?.species?.wateringFrequencyDays ||
        0
    );
  }

  const needsWatering = hydrationPercentage < 1;

  const careTips = JSON.parse(plant.data?.species?.tips || "[]");

  return (
    <main className="mx-auto flex max-w-screen-2xl flex-col gap-8 px-12 py-12">
      {/* Header */}
      <div className="flex flex-row justify-between gap-4 max-lg:flex-col max-lg:items-center">
        <h2 className="font-fraunces text-4xl font-semibold">Plant Details</h2>
        <div className="flex flex-row gap-4">
          <Link href={`/plants/${id}/edit`}>
            <Button className="bg-dark-200 text-light-200 hover:bg-dark-200/80 cursor-pointer">
              <Image src="/icons/edit.svg" alt="Edit" width={16} height={16} />
              <p>Edit plant</p>
            </Button>
          </Link>
          <DeletePlantButton plantId={id} />
        </div>
      </div>
      <div className="flex flex-row items-start gap-12 max-lg:flex-col max-lg:items-center">
        <div className="flex flex-col gap-4">
          <div
            className={cn(
              "bg-dark-200 shadow-plant-card border-dark-300 relative rounded-lg border-2 p-5",
              needsWatering && "border-destructive-200 border-2"
            )}
          >
            {needsWatering && (
              <Badge className="bg-destructive-200 text-destructive-foreground absolute -top-3 right-3">
                Water Today
              </Badge>
            )}
            <Image
              src={"/images/plant-big.png"}
              alt="Plant"
              width={500}
              height={500}
              className="min-h-[500px] min-w-[500px] object-cover max-lg:min-h-[300px] max-lg:min-w-[300px]"
            />
          </div>
          <div className="flex flex-col gap-4">
            {plant.data?.notes && (
              <div className="flex flex-col gap-4">
                <h3 className="font-fraunces text-xl font-semibold">Notes</h3>
                <p className="text-dark-600 text-lg">{plant.data?.notes}</p>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-6">
            <Badge className="bg-dark-400 text-light-200 text-md">
              {plant.data?.species?.name}
            </Badge>
            <div className="flex flex-row gap-4 max-lg:w-full max-lg:justify-between">
              <h2 className="font-fraunces text-4xl font-semibold">
                {plant.data?.name}
              </h2>
              <WaterButton plantId={plant.data!.id} />
            </div>
            {plant.data?.daysSinceLastWatering !== null && (
              <p className="text-dark-600 text-lg">
                Days since last watered:{" "}
                <span className="text-white">
                  {plant.data?.daysSinceLastWatering} Days
                </span>
              </p>
            )}
            <HydrationStatus value={hydrationPercentage} />
          </div>

          <div className="flex flex-col gap-6">
            <h3 className="font-fraunces text-xl font-semibold">Care Tips</h3>
            {careTips.length > 0 ? (
              <ul className="list-inside list-disc space-y-3">
                {careTips.map((tip: string) => (
                  <li key={tip} className="text-light-200 text-lg">
                    {tip}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No care tips available</p>
            )}
          </div>
          <div className="flex flex-col gap-6 max-lg:w-full max-lg:items-center">
            <h3 className="font-fraunces text-xl font-semibold">
              Companion Plants
            </h3>
            <div className="flex flex-wrap gap-6 max-lg:w-full max-lg:justify-center">
              {eligibleCompanions.data &&
                eligibleCompanions.data.length > 0 && (
                  <AddCompanion
                    plantId={id}
                    eligibleCompanions={eligibleCompanions.data || []}
                  />
                )}
              {companions.data?.map((companion: PlantCompanion) => (
                <CompanionCard
                  key={companion.companion?.id}
                  name={companion.companion?.name || ""}
                  species={companion.companion?.species?.name || ""}
                  notes={companion.notes || ""}
                  id={companion.companion?.id || ""}
                  companionId={companion.plant?.id || ""}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PlantPage;
