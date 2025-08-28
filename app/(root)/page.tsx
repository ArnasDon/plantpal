import PlantCard from "@/components/PlantCard";
import { getUser } from "@/lib/actions/auth.actions";
import { redirect } from "next/navigation";
import React from "react";
import { getUserPlants } from "@/lib/actions/plant.actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getThirstyPlants } from "@/lib/utils";
import Hero from "@/components/Hero";

const HomePage = async () => {
  const user = await getUser();
  if (!user) {
    redirect("/sign-in");
  }
  const plants = await getUserPlants();

  if (!plants.data) {
    throw new Error("No plants found");
  }

  const thirstyPlants = getThirstyPlants(plants.data, 25);

  return (
    <main className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-8 overflow-hidden py-12">
      {/* Hero */}
      <Hero />
      <div className="flex flex-wrap items-start justify-center gap-4">
        {thirstyPlants && thirstyPlants.length > 0 ? (
          thirstyPlants.map((plant: Plant) => (
            <PlantCard key={plant.id} plant={plant} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center gap-4">
            <h2 className="font-fraunces text-3xl font-semibold">
              There are no thirsty plants 🪴
            </h2>
            <p className="text-light-200">All your plants are doing great!</p>
          </div>
        )}
        {plants.data && plants.data.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-4">
            <h2 className="font-fraunces text-2xl font-semibold">
              No plants added yet.
            </h2>
            <p className="text-light-200">Add a plant to get started.</p>
            <Link href="/plants/new">
              <Button className="cursor-pointer px-8 py-6">
                <h2 className="text-2xl font-semibold">Add a plant</h2>
              </Button>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
};

export default HomePage;
