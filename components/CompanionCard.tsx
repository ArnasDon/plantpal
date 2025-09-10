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
import PlantImage from "./PlantImage";

const CompanionCard = ({
  name,
  species,
  notes,
  id,
  companionId,
  image,
}: {
  name: string;
  species: string;
  notes: string;
  id: string;
  companionId: string;
  image: string;
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
              image={image}
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
          image={image}
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
  image,
}: {
  name: string;
  species: string;
  id: string;
  companionId: string;
  image: string;
}) => {
  const handleDeletePlantCompanion = async (
    plantId: string,
    companionId: string,
    path: string
  ) => {
    const result = await deletePlantCompanion(plantId, companionId, path);
    if (result.success) {
      toast.custom(() => (
        <div className="toast-success">
          <h3 className="font-semibold">Companion deleted successfully</h3>
        </div>
      ));
    } else {
      toast.custom(() => (
        <div className="toast-error">
          <h3 className="font-semibold">Failed to delete companion</h3>
          <p className="text-sm">{result.error as string}</p>
        </div>
      ));
    }
  };
  return (
    <Link href={`/plants/${id}`}>
      <div className="companion-card">
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
        <div className="flex min-h-full flex-1 flex-col items-center gap-4">
          <Badge className="badge-species">{species}</Badge>
          <p className="font-fraunces text-2xl font-semibold">{name}</p>

          <PlantImage
            src={image}
            fallbackSrc="/images/plant-default.png"
            alt="Plant"
            width={120}
            height={120}
            className="size-[120px] object-contain"
          />
        </div>
      </div>
    </Link>
  );
};
