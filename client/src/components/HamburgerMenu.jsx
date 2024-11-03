import React, { useState } from "react";
import {
  HiBars4,
  HiMiniMagnifyingGlass,
  HiOutlineShoppingBag,
} from "react-icons/hi2";
import { Link } from "react-router-dom";

const HamburgerMenu = ({ open, setOpen }) => {
  return (
    <>
      {open && (
        <div className="fixed top-0 left-0 h-full w-full bg-gray-900 opacity-40 transition-opacity duration-300 ease-in-out"></div>
      )}
      <div
        className={`fixed h-full w-[50%]  top-0 left-0 z-20 bg-white flex md:hidden flex-col p-3 gap-2 ${
          open ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out `}
      >
        <button
          className="self-end rounded-full p-1 px-2 flex items-center justify-center hover:bg-amber-300"
          onClick={() => setOpen(false)}
        >
          x
        </button>

        <h1 className="cursor-pointer text-2xl font-bold text-amber-500">
          Tomato.
        </h1>
        <Link className="font-semibold  hover:border-b-2  hover:text-amber-600 transition-all duration-300">
          Home
        </Link>
        <Link className="font-semibold  hover:border-b-2  hover:text-amber-600 transition-all duration-300 ">
          Menu
        </Link>

        <Link className="font-semibold  hover:border-b-2  hover:text-amber-600 transition-all duration-300 ">
          Contact Us
        </Link>
      </div>
    </>
  );
};

export default HamburgerMenu;
