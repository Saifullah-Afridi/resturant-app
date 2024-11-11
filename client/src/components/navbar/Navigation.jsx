import React, { useState } from "react";

import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { HiBars4 } from "react-icons/hi2";
import HamburgerMenu from "./HamburgerMenu";
import NavigationLinks from "./NavigationLinks";
import Cart from "./Cart";
import { Link, Outlet } from "react-router-dom";
import Authentication from "./Authentication";

const Navigation = () => {
  const [open, setOpen] = useState(false);
  const [loginState, setLoginState] = useState(false);
  const [signupState, setSignUpState] = useState(true);
  return (
    <>
      <div className="border-b-2 pb-3 shadow-sm sticky top-0 right-0 z-10 bg-amber-100">
        <nav className=" w-[90%] max-w-[1100px]  mx-auto h-12 pt-4 ">
          <div className="h-full flex justify-between items-center  ">
            <Link to="/">
              <h1 className="cursor-pointer text-2xl font-bold text-amber-500">
                Tomato.
              </h1>
            </Link>
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
              <Authentication
                loginState={loginState}
                setLoginState={setLoginState}
                signupState={signupState}
                setSignUpState={setSignUpState}
              />
              <div
                className="block md:hidden rounded-full hover:bg-amber-300  p-3 transition-all duration-300"
                onClick={() => setOpen(true)}
              >
                <HiBars4 />
              </div>
            </div>
          </div>
        </nav>
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
