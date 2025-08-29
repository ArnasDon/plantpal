import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

const EmptyStateConsts = {
  none: {
    title: "No plants added yet! 🪴",
    description: "Add a plant to get started.",
  },
  thirsty: {
    title: "There are no thirsty plants 🪴",
    description: "All your plants are doing great!",
  },
};

const EmptyState = ({ type }: { type: "none" | "thirsty" }) => {
  return (
    <section className="border-dark-400 flex w-full flex-col items-center justify-center rounded-lg border-2 border-dashed pb-12">
      <Image
        src="/images/empty-state-small.gif"
        alt="Empty State"
        width={214}
        height={204}
      />
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <h2>{EmptyStateConsts[type].title}</h2>
        <p className="text-light-200">{EmptyStateConsts[type].description}</p>
        {type === "none" && (
          <Link href="/plants/new">
            <Button className="button-big px-26 py-5">
              <Image
                src="/icons/add.svg"
                alt="Add"
                width={15}
                height={15}
                className="mr-2"
              />
              <h3 className="font-onest text-lg font-semibold">Add a Plant</h3>
            </Button>
          </Link>
        )}
      </div>
    </section>
  );
};

export default EmptyState;
