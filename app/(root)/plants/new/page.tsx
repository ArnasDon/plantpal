import PlantForm from "@/components/forms/PlantForm";
import Image from "next/image";
import React from "react";

const NewPlant = async () => {
  return (
    <main className="form-section">
      <div className="w-1/2 max-lg:w-full">
        <PlantForm />
      </div>
      <div className="w-1/2 items-center justify-center max-lg:hidden">
        <Image
          src="/images/form-bg1.png"
          alt="plant"
          width={500}
          height={500}
          className="size-full object-cover"
        />
      </div>
    </main>
  );
};

export default NewPlant;
