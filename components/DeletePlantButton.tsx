"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { deletePlant } from "@/lib/actions/plant.actions";
import { redirect } from "next/navigation";

const DeletePlantButton = ({ plantId }: { plantId: string }) => {
  const handleDelete = async () => {
    const result = await deletePlant(plantId);
    if (result.success) {
      redirect("/plants");
    }
  };
  return (
    <Button className="button-delete" onClick={handleDelete}>
      <Image src="/icons/trash.svg" alt="Delete" width={16} height={16} />
      <p>Delete plant</p>
    </Button>
  );
};

export default DeletePlantButton;
