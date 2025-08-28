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
    <main className="flex flex-col gap-8 items-center justify-center py-12 max-w-7xl mx-auto overflow-hidden">
      <Hero />
      <div className="flex flex-wrap items-start justify-center gap-4">
        {plants.data &&
          plants.data.length > 0 &&
          plants.data.map((plant: Plant) => (
            <PlantCard key={plant.id} plant={plant} />
          ))}
        {plants.data && plants.data.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-4">
            <h2 className="text-2xl font-semibold font-fraunces">
              No plants added yet.
            </h2>
            <p className="text-light-200">Add a plant to get started.</p>
            <Link href="/plants/new">
              <Button className="px-8 py-6 cursor-pointer">
                <h2 className="font-semibold text-2xl">Add a plant</h2>
              </Button>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
};

export default MyPlants;
