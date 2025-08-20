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
      className="bg-red-100  px-4 py-2 rounded-md flex items-center gap-2 shadow-button cursor-pointer hover:bg-red-100/80 transition-all duration-300"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
