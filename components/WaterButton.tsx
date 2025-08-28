"use client";
import React from "react";
import { Button } from "./ui/button";
import { waterPlant } from "@/lib/actions/plant.actions";
import { toast } from "sonner";
import Image from "next/image";
import { usePathname } from "next/navigation";

const WaterButton = ({ plantId }: { plantId: string }) => {
  const path = usePathname();

  const handleWaterPlant = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const result = await waterPlant({ plantId, path });
    if (result.success) {
      toast.custom(() => (
        <div className="bg-primary shadow-plant-card flex flex-col gap-4 overflow-hidden rounded-lg p-4">
          <h3 className="font-semibold">Plant watered successfully</h3>
        </div>
      ));
    } else {
      toast.custom(() => (
        <div className="bg-destructive shadow-plant-card flex flex-col gap-4 overflow-hidden rounded-lg p-4">
          <h3 className="font-semibold">Plant watering failed</h3>
          <p className="text-sm">{result.error as string}</p>
        </div>
      ));
    }
  };
  return (
    <Button onClick={(e) => handleWaterPlant(e)}>
      <Image src="/icons/water.svg" alt="Watering can" width={14} height={14} />
      <p>Mark as Watered</p>
    </Button>
  );
};

export default WaterButton;
