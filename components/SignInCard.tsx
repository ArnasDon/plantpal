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
    <div className="auth-card">
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
      <div className="auth-card-title">
        <h2>Start Caring Smarter 🌱</h2>
        <p className="auth-card-text">
          Your plants will never miss a drink again. Sign in to start tracking
          care and watering schedules.
        </p>
      </div>
      <button onClick={handleSignIn} className="auth-card-button">
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
