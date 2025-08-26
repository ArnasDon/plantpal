import Image from "next/image";
import React from "react";
import { Badge } from "./ui/badge";

const CompanionCard = () => {
  return (
    <div className="bg-dark-300 rounded-lg p-2 shadow-plant-card border-2 border-dark-400 min-w-[210px]">
      <div className="flex flex-col gap-4 items-center">
        <Badge className="bg-dark-400 text-light-200">Plant Species</Badge>
        <p className="text-2xl font-semibold font-fraunces">Plant Name</p>

        <Image
          src={"/images/plant-default.png"}
          alt="Plant"
          width={100}
          height={100}
        />
      </div>
    </div>
  );
};

export default CompanionCard;
