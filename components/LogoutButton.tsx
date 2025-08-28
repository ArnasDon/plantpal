"use client";
import { authClient } from "@/lib/auth-client";
import React from "react";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();
  const handleLogout = async () => {
    await authClient.signOut();
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-destructive shadow-button hover:bg-destructive/80 flex cursor-pointer items-center gap-2 rounded-md px-4 py-2 transition-all duration-300"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
