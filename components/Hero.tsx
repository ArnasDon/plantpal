import React from "react";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="hero-section">
      {/* Top leaf */}
      <Image
        src="/images/leaves.png"
        alt="Leaves"
        width={100}
        height={100}
        className="absolute -top-12 left-1/2 -translate-x-1/2"
      />

      {/* Center text */}
      <div className="hero-text-container">
        <h1>Keep Your Plants Happy, One Sip at a Time 🌿</h1>
        <p className="text-light-200 mt-2 text-center">
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
    </section>
  );
};

export default Hero;
