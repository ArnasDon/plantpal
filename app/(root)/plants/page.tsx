import { getUserPlants } from "@/lib/actions/plant.actions";
import { getUser } from "@/lib/actions/auth.actions";
import { redirect } from "next/navigation";
import React from "react";

const MyPlants = async () => {
  const user = await getUser();
  if (!user) {
    redirect("/sign-in");
  }
  const plants = await getUserPlants();
  return (
    <div>
      {plants?.map((plant: Plant) => (
        <div key={plant.id}>
          {plant.name} - {plant.species?.name}
        </div>
      ))}
    </div>
  );
};

export default MyPlants;
