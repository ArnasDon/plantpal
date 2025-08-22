import PlantCard from "@/components/PlantCard";
import { getUser } from "@/lib/actions/auth.actions";
import { redirect } from "next/navigation";
import React from "react";
import Image from "next/image";
import { getUserPlants } from "@/lib/actions/plant.actions";

const HomePage = async () => {
  const user = await getUser();
  if (!user) {
    redirect("/sign-in");
  }
  const plants = await getUserPlants();
  return (
    <main className="flex flex-col gap-8 items-center justify-center pt-12 max-w-7xl mx-auto overflow-hidden">
      {/* Hero */}
      <div className="relative flex flex-col items-center justify-center bg-dark-200 rounded-lg border-[2px] border-white/27 mx-20 py-12">
        {/* Top leaf */}
        <Image
          src="/images/leaves.png"
          alt="Leaves"
          width={100}
          height={100}
          className="absolute -top-12 left-1/2 -translate-x-1/2"
        />

        {/* Center text */}
        <div className="flex flex-col items-center justify-center max-w-2xl mx-40 gap-4">
          <h1 className="text-5xl font-semibold font-fraunces text-center">
            Keep Your Plants Happy, One Sip at a Time 🌿
          </h1>
          <p className="text-dark-600 text-center mt-2">
            Track schedules and keep your plants in great shape.
          </p>
        </div>

        {/* Left plant */}
        <Image
          src="/images/plant-1.png"
          alt="Plant Left"
          width={363}
          height={392}
          className="absolute -bottom-5 -left-35"
        />

        {/* Right plant */}
        <Image
          src="/images/plant-2.png"
          alt="Plant Right"
          width={373}
          height={374}
          className="absolute -bottom-26 -right-30"
        />
      </div>
      <div className="flex flex-wrap items-start justify-center gap-4">
        {plants?.data?.map((plant: Plant) => (
          <PlantCard key={plant.id} plant={plant} />
        ))}
      </div>
    </main>
  );
};

export default HomePage;
