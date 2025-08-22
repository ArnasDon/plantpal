import PlantForm from "@/components/forms/PlantForm";
import Image from "next/image";
import React from "react";

const NewPlant = async () => {
  return (
    <div className="flex flex-row h-[calc(100vh-4.5rem)]">
      <div className="w-1/2 max-md:w-full">
        <PlantForm />
      </div>
      <div className="w-1/2 items-center justify-center max-md:hidden">
        <Image
          src="/images/form-bg1.png"
          alt="plant"
          width={500}
          height={500}
          className="size-full object-cover"
        />
      </div>
    </div>
  );
};

export default NewPlant;
