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
        <div className="flex items-center justify-center bg-dark-300 rounded-lg shadow-plant-card border-2 border-dashed border-dark-400 min-w-[210px] min-h-[220px] cursor-pointer">
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
          <DialogTitle className="text-2xl font-semibold font-fraunces">
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
