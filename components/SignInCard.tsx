"use client";
import Image from "next/image";
import React from "react";
import { authClient } from "@/lib/auth-client";

const SignInCard = () => {
  const handleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center bg-dark-200 rounded-xl gap-8 shadow-card py-10 px-8 max-w-[500px]">
      <div className="flex items-center gap-2 mb-2">
        <Image
          src="/icons/logo.svg"
          alt="logo"
          width={36}
          height={36}
          className="size-9"
        />
        <h2 className="text-3xl font-semibold font-fraunces">PlantPal</h2>
      </div>
      <h2 className="text-3xl font-semibold font-fraunces">
        Start Caring Smarter 🌱
      </h2>
      <p className="text-light-200 text-lg font-onest text-center">
        Your plants will never miss a drink again. Sign in to start tracking
        care and watering schedules.
      </p>
      <button
        onClick={handleSignIn}
        className="bg-primary text-light-100 px-4 py-2 rounded-md flex items-center gap-2 shadow-button cursor-pointer hover:bg-primary/80 transition-all duration-300"
      >
        <Image
          src="/icons/google.svg"
          alt="google"
          width={14}
          height={14}
          className="size-3.5"
        />
        <span className="text-lg font-onest font-semibold">
          Sign in with Google
        </span>
      </button>
    </div>
  );
};

export default SignInCard;
