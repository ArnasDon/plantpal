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
import PlantImage from "@/components/PlantImage";

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
      plant.data?.daysSinceLastWatering ?? -1,
      plant.data?.wateringFrequencyOverride ??
        plant.data?.species?.wateringFrequencyDays ??
        0
    );
  }

  const needsWatering = hydrationPercentage < 1;

  const careTips = JSON.parse(plant.data?.species?.tips || "[]");

  return (
    <main className="plant-details-container">
      {/* Header */}
      <div className="plant-details-header">
        <h1 className="text-4xl">Plant Details</h1>
        <div className="flex flex-row gap-4">
          <Link href={`/plants/${id}/edit`}>
            <Button className="button-edit">
              <Image src="/icons/edit.svg" alt="Edit" width={16} height={16} />
              <p>Edit plant</p>
            </Button>
          </Link>
          <DeletePlantButton plantId={id} />
        </div>
      </div>
      {/* Main section */}
      <section className="plant-details-section">
        {/* Left side */}
        <div className="flex w-2/5 flex-col items-center gap-4 max-lg:w-full">
          <div
            className={cn(
              "plant-details-image",
              needsWatering && "border-destructive-200 border-2"
            )}
          >
            {needsWatering && (
              <Badge className="badge-water-today absolute -top-3 right-3">
                Water Today
              </Badge>
            )}
            <PlantImage
              src={plant.data?.imageUrl}
              fallbackSrc="/images/plant-big.png"
              alt="Plant"
              width={500}
              height={500}
              className="size-[500px] object-cover object-top"
            />
          </div>
          <div className="plant-details-notes">
            {plant.data?.notes && (
              <div className="plant-details-notes">
                <h3>Notes</h3>
                <p className="text-light-200 text-lg">{plant.data?.notes}</p>
              </div>
            )}
          </div>
        </div>
        {/* Right side */}
        <div className="flex w-3/5 flex-col gap-10 max-lg:w-full">
          <div className="flex flex-col gap-6">
            <Badge className="badge-species text-md">
              {plant.data?.species?.name}
            </Badge>
            <div className="plant-details-name">
              <h2 className="text-4xl">{plant.data?.name}</h2>
              <WaterButton plantId={plant.data!.id} />
            </div>
            {plant.data?.daysSinceLastWatering !== null && (
              <p className="text-light-200 text-lg">
                Days since last watered:{" "}
                <span className="text-white">
                  {plant.data?.daysSinceLastWatering} Days
                </span>
              </p>
            )}
            <HydrationStatus value={hydrationPercentage} />
          </div>

          <div className="flex flex-col gap-6">
            <h3>Care Tips</h3>
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
          <section className="companions-section">
            <h3>Companion Plants</h3>
            <div className="companions-list">
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
                  name={companion.companion!.name}
                  species={companion.companion!.species!.name}
                  notes={companion.notes}
                  id={companion.companion!.id}
                  companionId={companion.plant!.id}
                  image={companion.companion!.imageUrl}
                />
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
};

export default PlantPage;
