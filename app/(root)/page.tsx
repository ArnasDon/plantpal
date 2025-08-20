import { getUser } from "@/lib/actions/auth.actions";
import { redirect } from "next/navigation";
import React from "react";

const HomePage = async () => {
  const user = await getUser();
  if (!user) {
    redirect("/sign-in");
  }
  return <div className="">Welcome to PlantPal {user?.name}</div>;
};

export default HomePage;
