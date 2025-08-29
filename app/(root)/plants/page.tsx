import { getUserPlants } from "@/lib/actions/plant.actions";
import { getUser } from "@/lib/actions/auth.actions";
import { redirect } from "next/navigation";
import React from "react";
import PlantCard from "@/components/PlantCard";
import Hero from "@/components/Hero";
import EmptyState from "@/components/EmptyState";

const MyPlants = async () => {
  const user = await getUser();
  if (!user) {
    redirect("/sign-in");
  }
  const plants = await getUserPlants();
  return (
    <main className="page-container">
      <Hero />
      <section className="plants-section">
        {plants.data && plants.data.length > 0 ? (
          plants.data.map((plant: Plant) => (
            <PlantCard key={plant.id} plant={plant} />
          ))
        ) : (
          <EmptyState type="none" />
        )}
      </section>
    </main>
  );
};

export default MyPlants;
