import React from "react";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="bg-dark-200 relative mx-20 flex flex-col items-center justify-center rounded-lg border-[2px] border-white/27 py-12 max-md:mx-4 max-md:w-full max-md:px-2">
      {/* Top leaf */}
      <Image
        src="/images/leaves.png"
        alt="Leaves"
        width={100}
        height={100}
        className="absolute -top-12 left-1/2 -translate-x-1/2"
      />

      {/* Center text */}
      <div className="mx-40 flex max-w-2xl flex-col items-center justify-center gap-4 max-md:mx-4 max-md:w-full">
        <h1 className="font-fraunces text-center text-5xl font-semibold">
          Keep Your Plants Happy, One Sip at a Time 🌿
        </h1>
        <p className="text-dark-600 mt-2 text-center">
          Track schedules and keep your plants in great shape.
        </p>
      </div>

      {/* Left plant */}
      <Image
        src="/images/plant-1.png"
        alt="Plant Left"
        width={363}
        height={392}
        className="absolute -bottom-5 -left-35 max-md:hidden"
      />

      {/* Right plant */}
      <Image
        src="/images/plant-2.png"
        alt="Plant Right"
        width={373}
        height={374}
        className="absolute -right-30 -bottom-26 max-md:hidden"
      />
    </div>
  );
};

export default Hero;
