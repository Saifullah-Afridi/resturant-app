import React, { useState } from "react";

import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { HiBars4 } from "react-icons/hi2";
import HamburgerMenu from "./HamburgerMenu";
import NavigationLinks from "./NavigationLinks";
import Cart from "./Cart";

const Navigation = () => {
  const [open, setOpen] = useState(false);
  return (
    <nav className=" w-[90%] max-w-[1100px]  mx-auto h-12 pt-4 ">
      <div className="h-full flex justify-between items-center  ">
        <h1 className="cursor-pointer text-2xl font-bold text-amber-500">
          Tomato.
        </h1>
        <div className="hidden md:block">
          <NavigationLinks open={open} />
        </div>
        <HamburgerMenu open={open} setOpen={setOpen} />
        <div className="flex items-center gap-4   ">
          <button
            type="button"
            className=" hidden md:block rounded-full hover:bg-amber-300  p-3 transition-all duration-300"
          >
            <HiMiniMagnifyingGlass />
          </button>
          <Cart />
          <button
            type="button"
            className="hidden md:block border-[1px] rounded-3xl border-amber-500 py-[3px] px-2 hover:bg-amber-300 transition-all duration-300"
          >
            Sign In
          </button>
          <div
            className="block md:hidden rounded-full hover:bg-amber-300  p-3 transition-all duration-300"
            onClick={() => setOpen(true)}
          >
            <HiBars4 />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
