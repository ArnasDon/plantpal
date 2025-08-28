import Image from "next/image";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import CompanionForm from "./forms/CompanionForm";
const AddCompanion = ({
  plantId,
  eligibleCompanions,
}: {
  plantId: string;
  eligibleCompanions: Plant[];
}) => {
  //   const [plant, setPlant] = useState<string | null>(null);
  return (
    <Dialog>
      <DialogTrigger>
        <div className="bg-dark-300 shadow-plant-card border-dark-400 flex min-h-[220px] min-w-[210px] cursor-pointer items-center justify-center rounded-lg border-2 border-dashed">
          <Image
            src="/icons/plus.svg"
            alt="Add Companion"
            width={100}
            height={100}
            className=""
          />
        </div>
      </DialogTrigger>
      <DialogContent className="bg-dark-100 border-dark-300 shadow-card">
        <DialogHeader>
          <DialogTitle className="font-fraunces text-2xl font-semibold">
            Add Companion
          </DialogTitle>
        </DialogHeader>

        <CompanionForm
          plantId={plantId}
          eligibleCompanions={eligibleCompanions}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddCompanion;
