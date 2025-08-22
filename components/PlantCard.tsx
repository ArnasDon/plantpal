import React from "react";
import { Badge } from "./ui/badge";

const PlantCard = async ({ plant }: { plant: Plant }) => {
  return (
    <div className="bg-dark-200 rounded-lg p-4 shadow-plant-card flex flex-col gap-4">
      <Badge className="bg-dark-400 text-light-200">
        {plant.species?.name}
      </Badge>
      <h3 className="text-xl font-semibold font-fraunces">{plant.name}</h3>
      <p className="text-dark-600">
        Days since last watered: <span className="text-white">10 Days</span>
      </p>
    </div>
  );
};

export default PlantCard;
