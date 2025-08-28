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
    <div className="bg-dark-200 shadow-card flex max-w-[500px] flex-col items-center justify-center gap-8 rounded-xl px-8 py-10">
      <div className="mb-2 flex items-center gap-2">
        <Image
          src="/icons/logo.svg"
          alt="logo"
          width={36}
          height={36}
          className="size-9"
        />
        <h2>PlantPal</h2>
      </div>
      <h2>Start Caring Smarter 🌱</h2>
      <p className="text-light-200 font-onest text-center text-lg">
        Your plants will never miss a drink again. Sign in to start tracking
        care and watering schedules.
      </p>
      <button
        onClick={handleSignIn}
        className="bg-primary text-light-100 shadow-button hover:bg-primary/80 flex cursor-pointer items-center gap-2 rounded-md px-4 py-2 transition-all duration-300"
      >
        <Image
          src="/icons/google.svg"
          alt="google"
          width={14}
          height={14}
          className="size-3.5"
        />
        <span className="font-onest text-lg font-semibold">
          Sign in with Google
        </span>
      </button>
    </div>
  );
};

export default SignInCard;
