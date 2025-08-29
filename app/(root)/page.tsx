import PlantCard from "@/components/PlantCard";
import { getUser } from "@/lib/actions/auth.actions";
import { redirect } from "next/navigation";
import React from "react";
import { getUserPlants } from "@/lib/actions/plant.actions";
import { getThirstyPlants } from "@/lib/utils";
import Hero from "@/components/Hero";
import EmptyState from "@/components/EmptyState";

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
    <main className="page-container">
      <Hero />
      <section className="plants-section">
        {plants.data && plants.data.length === 0 ? (
          <EmptyState type="none" />
        ) : (
          <>
            {thirstyPlants && thirstyPlants.length > 0 ? (
              thirstyPlants.map((plant: Plant) => (
                <PlantCard key={plant.id} plant={plant} />
              ))
            ) : (
              <EmptyState type="thirsty" />
            )}
          </>
        )}
      </section>
    </main>
  );
};

export default HomePage;
