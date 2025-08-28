import { getUserPlants } from "@/lib/actions/plant.actions";
import { getUser } from "@/lib/actions/auth.actions";
import { redirect } from "next/navigation";
import React from "react";
import PlantCard from "@/components/PlantCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Hero from "@/components/Hero";

const MyPlants = async () => {
  const user = await getUser();
  if (!user) {
    redirect("/sign-in");
  }
  const plants = await getUserPlants();
  return (
    <main className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-8 overflow-hidden py-12">
      <Hero />
      <div className="flex flex-wrap items-start justify-center gap-4">
        {plants.data &&
          plants.data.length > 0 &&
          plants.data.map((plant: Plant) => (
            <PlantCard key={plant.id} plant={plant} />
          ))}
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

export default MyPlants;
