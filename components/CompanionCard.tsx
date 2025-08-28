"use client";
import Image from "next/image";
import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { toast } from "sonner";
import { deletePlantCompanion } from "@/lib/actions/companion.actions";

const CompanionCard = ({
  name,
  species,
  notes,
  id,
  companionId,
}: {
  name: string;
  species: string;
  notes: string;
  id: string;
  companionId: string;
}) => {
  return (
    <>
      {notes && notes.length > 0 ? (
        <Tooltip>
          <TooltipTrigger>
            <CompanionCardContent
              name={name}
              species={species}
              id={id}
              companionId={companionId}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>{notes}</p>
          </TooltipContent>
        </Tooltip>
      ) : (
        <CompanionCardContent
          name={name}
          species={species}
          id={id}
          companionId={companionId}
        />
      )}
    </>
  );
};

export default CompanionCard;

const CompanionCardContent = ({
  name,
  species,
  id,
  companionId,
}: {
  name: string;
  species: string;
  id: string;
  companionId: string;
}) => {
  const handleDeletePlantCompanion = async (
    plantId: string,
    companionId: string,
    path: string
  ) => {
    const result = await deletePlantCompanion(plantId, companionId, path);
    if (result.success) {
      toast.custom(() => (
        <div className="bg-primary shadow-plant-card flex flex-col gap-4 overflow-hidden rounded-lg p-4">
          <h3 className="font-semibold">Companion deleted successfully</h3>
        </div>
      ));
    } else {
      toast.custom(() => (
        <div className="bg-destructive shadow-plant-card flex flex-col gap-4 overflow-hidden rounded-lg p-4">
          <h3 className="font-semibold">Failed to delete companion</h3>
          <p className="text-sm">{result.error as string}</p>
        </div>
      ));
    }
  };
  return (
    <Link href={`/plants/${id}`}>
      <div className="bg-dark-300 shadow-plant-card border-dark-400 relative min-h-[220px] min-w-[210px] rounded-lg border-2 p-2">
        <Image
          src="/icons/cross.svg"
          alt="Delete"
          width={16}
          height={16}
          className="absolute top-3 right-3 cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleDeletePlantCompanion(id, companionId, `/plants/${id}`);
          }}
        />
        <div className="flex flex-col items-center gap-4">
          <Badge className="bg-dark-400 text-light-200">{species}</Badge>
          <p className="font-fraunces text-2xl font-semibold">{name}</p>
          <Image
            src="/images/plant-default.png"
            alt="Plant"
            width={100}
            height={100}
          />
        </div>
      </div>
    </Link>
  );
};
