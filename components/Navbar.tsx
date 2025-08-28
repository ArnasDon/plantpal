import Image from "next/image";
import React from "react";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link href="/" className="flex cursor-pointer items-center gap-2">
        <Image src="/icons/logo.svg" alt="logo" width={30} height={30} />
        <span className="navbar-logo max-md:hidden">PlantPal</span>
      </Link>
      <div className="navbar-links">
        <Link href="/plants">My Plants</Link>
        <Link href="/plants/new">Add Plant</Link>
        <LogoutButton />
      </div>
    </nav>
  );
};

export default Navbar;
