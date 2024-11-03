import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { HiBars4 } from "react-icons/hi2";
import HamburgerMenu from "./HamburgerMenu";

const Navigation = () => {
  const [open, setOpen] = useState(false);
  return (
    <nav className="max-w-[1300px] w-[90%] mx-auto h-12 pt-4 ">
      <div className="h-full flex justify-between items-center  ">
        <h1 className="cursor-pointer text-2xl font-bold text-amber-500">
          Tomato.
        </h1>
        <div className="hidden md:flex gap-6">
          <Link className="font-semibold  border-b-2 border-transparent  hover:border-b-2 hover:border-amber-600 hover:text-amber-600 transition-all duration-300 ">
            Home
          </Link>
          <Link className="font-semibold  border-b-2 border-transparent  hover:border-b-2 hover:border-amber-600 hover:text-amber-600 transition-all duration-300 ">
            Menu
          </Link>
          <Link className="font-semibold  border-b-2 border-transparent  hover:border-b-2 hover:border-amber-600 hover:text-amber-600 transition-all duration-300 ">
            Contact Us
          </Link>
        </div>
        <div
          className="block md:hidden rounded-full hover:bg-amber-300  p-2 transition-all duration-300"
          onClick={() => setOpen(true)}
        >
          <HiBars4 />
        </div>
        <HamburgerMenu open={open} setOpen={setOpen} />
        <div className="hidden md:flex items-center gap-6   ">
          <button
            type="button"
            className="rounded-full hover:bg-amber-300  p-2 transition-all duration-300"
          >
            <HiMiniMagnifyingGlass />
          </button>
          <button
            type="button"
            className="rounded-full hover:bg-amber-300  p-2 transition-all duration-300"
          >
            <HiOutlineShoppingBag />
          </button>
          <button
            type="button"
            className=" border-[1px] rounded-3xl border-amber-500 py-[3px] px-2 hover:bg-amber-300 transition-all duration-300"
          >
            Sign In
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
