import React, { useEffect, useState } from "react";
import NavigationLinks from "./NavigationLinks";

const HamburgerMenu = ({ open, setOpen }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };
    if (open) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);
  return (
    <>
      {open && (
        <div
          className="fixed top-0 left-0 h-full w-full bg-gray-900 opacity-40 transition-opacity duration-300 ease-in-out"
          onClick={() => setOpen(false)}
        ></div>
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
        <NavigationLinks open={open} />
      </div>
    </>
  );
};

export default HamburgerMenu;
