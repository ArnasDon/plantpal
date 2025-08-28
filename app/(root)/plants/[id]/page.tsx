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

const PlantPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const user = await getUser();
  if (!user) {
    redirect("/sign-in");
  }
  const { id } = await params;
  const plant = await getPlant(id);

  const userPlants = await getUserPlants();

  const companions = await getPlantCompanions(id);
  // console.log(companions.data);
  const eligibleCompanions = await getEligibleCompanions(id);
  if (!plant.success || !userPlants.success || !eligibleCompanions.success) {
    redirect("/plants");
  }

  let hydrationPercentage = 0;

  if (plant.data?.daysSinceLastWatering !== null) {
    hydrationPercentage = getHydrationPercentage(
      plant.data?.daysSinceLastWatering || 0,
      plant.data?.wateringFrequencyOverride ||
        plant.data?.species?.wateringFrequencyDays ||
        0
    );
  }

  const needsWatering = hydrationPercentage < 1;

  const careTips = JSON.parse(plant.data?.species?.tips || "[]");

  return (
    <main className="flex flex-col gap-8 max-w-screen-2xl mx-auto py-12 px-12">
      <div className="flex flex-row  justify-between gap-4">
        <h2 className="text-4xl font-semibold font-fraunces">Plant Details</h2>
        <div className="flex flex-row gap-4">
          <Link href={`/plants/${id}/edit`}>
            <Button className="bg-dark-200 text-light-200 hover:bg-dark-200/80 cursor-pointer">
              <Image src="/icons/edit.svg" alt="Edit" width={16} height={16} />
              <p>Edit plant</p>
            </Button>
          </Link>
          <Button className="bg-dark-200 text-destructive-200 hover:bg-dark-200/80 cursor-pointer">
            <Image src="/icons/trash.svg" alt="Delete" width={16} height={16} />
            <p>Delete plant</p>
          </Button>
        </div>
      </div>
      <div className="flex flex-row items-start gap-12">
        <div className="flex flex-col gap-4">
          <div
            className={cn(
              "relative rounded-lg p-5 bg-dark-200 shadow-plant-card border-2 border-dark-300",
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
              className="min-w-[500px] min-h-[500px] object-cover"
            />
          </div>
          <div className="flex flex-col gap-4">
            {plant.data?.notes && (
              <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold font-fraunces">Notes</h3>
                <p className="text-lg text-dark-600">{plant.data?.notes}</p>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-6">
            <Badge className="bg-dark-400 text-light-200 text-md">
              {plant.data?.species?.name}
            </Badge>
            <div className="flex flex-row gap-4">
              <h2 className="text-4xl font-semibold font-fraunces">
                {plant.data?.name}
              </h2>
              <WaterButton plantId={plant.data!.id} />
            </div>
            {plant.data?.daysSinceLastWatering !== null && (
              <p className="text-lg text-dark-600">
                Days since last watered:{" "}
                <span className="text-white">
                  {plant.data?.daysSinceLastWatering} Days
                </span>
              </p>
            )}
            <HydrationStatus value={hydrationPercentage} />
          </div>

          <div className="flex flex-col gap-6">
            <h3 className="text-xl font-semibold font-fraunces">Care Tips</h3>
            {careTips.length > 0 ? (
              <ul className="list-disc list-inside space-y-3">
                {careTips.map((tip: string) => (
                  <li key={tip} className="text-lg text-light-200">
                    {tip}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No care tips available</p>
            )}
          </div>
          <div className="flex flex-col gap-6">
            <h3 className="text-xl font-semibold font-fraunces">
              Companion Plants
            </h3>
            <div className="flex flex-wrap gap-6">
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
