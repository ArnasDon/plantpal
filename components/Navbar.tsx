import Image from "next/image";
import React from "react";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

const Navbar = () => {
  return (
    <nav className="w-full bg-dark-200 flex justify-between items-center px-8 py-4">
      <Link href="/" className="flex items-center gap-2 cursor-pointer">
        <Image src="/icons/logo.svg" alt="logo" width={30} height={30} />
        <span className="text-xl font-semibold font-fraunces">PlantPal</span>
      </Link>
      <div className="flex items-center gap-[30px]">
        <Link href="/plants">My Plants</Link>
        <Link href="/plants/new">Add Plant</Link>
        <LogoutButton />
      </div>
    </nav>
  );
};

export default Navbar;
