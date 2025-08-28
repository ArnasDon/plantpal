import Image from "next/image";
import React from "react";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

const Navbar = () => {
  return (
    <nav className="bg-dark-200 flex w-full items-center justify-between px-8 py-4">
      <Link href="/" className="flex cursor-pointer items-center gap-2">
        <Image src="/icons/logo.svg" alt="logo" width={30} height={30} />
        <span className="font-fraunces text-xl font-semibold max-md:hidden">
          PlantPal
        </span>
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
