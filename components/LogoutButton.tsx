"use client";
import React from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();
  const handleLogout = async () => {
    await authClient.signOut();
    router.refresh();
  };

  return (
    <button onClick={handleLogout} className="button-logout">
      Logout
    </button>
  );
};

export default LogoutButton;
