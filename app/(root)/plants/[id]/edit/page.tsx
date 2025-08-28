import { getPlant } from "@/lib/actions/plant.actions";
import { redirect } from "next/navigation";
import React from "react";
import PlantForm from "@/components/forms/PlantForm";
import Image from "next/image";

const EditPlant = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const plant = await getPlant(id);
  if (!plant.success) {
    redirect("/plants");
  }

  return (
    <main className="flex h-[calc(100vh-4.5rem)] flex-row">
      <div className="w-1/2 max-lg:w-full">
        <PlantForm plant={plant.data as Plant} />
      </div>
      <div className="w-1/2 items-center justify-center max-lg:hidden">
        <Image
          src="/images/form-bg2.png"
          alt="plant"
          width={500}
          height={500}
          className="size-full object-cover"
        />
      </div>
    </main>
  );
};

export default EditPlant;
