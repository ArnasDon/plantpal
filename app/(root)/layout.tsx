import Navbar from "@/components/Navbar";
import React from "react";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen">
      <Navbar />
      {children}
    </div>
  );
};

export default RootLayout;
