import React, { useState } from "react";
import { HiEye, HiEyeSlash } from "react-icons/hi2";

const Authentication = ({
  loginState,
  setLoginState,
  signupState,
  setSignUpState,
}) => {
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <button
        type="button"
        className="hidden md:block border-[1px] rounded-3xl border-amber-500 py-[5px]  px-5 hover:bg-amber-300 transition-all duration-300"
        onClick={() => setOpen(true)}
      >
        Sign In
      </button>

      {open && (
        <div
          className="fixed top-0 left-0 h-full w-full bg-black opacity-50 z-40"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {open && (
        <div className="fixed top-28 left-1/2 transform -translate-x-1/2 h-[70vh] w-[80%] md:w-[50%] flex flex-col bg-white  z-[99] mx-auto rounded-lg ">
          {signupState && (
            <div>
              <h2 className="text-amber-900 text-xl font-semibold my-4 text-center">
                Sign Up
              </h2>
              <form className="flex flex-col gap-4 px-6 w-[90%] mx-auto ">
                <input
                  type="text"
                  name="name"
                  id="name"
                  className=" h-8 p-2 border border-gray-800 focus:border-none  focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-md"
                  placeholder="Enter your name"
                />
                <input
                  type="email"
                  name="email"
                  id="email"
                  className=" h-8 p-2 border border-gray-800 focus:border-none  focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-md"
                  placeholder="Enter your email  "
                />
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  className=" h-8 p-2 border border-gray-800 focus:border-none  focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-md"
                  placeholder="Enter your phone number"
                />
                <div className="relative">
                  <input
                    type={`${showPassword ? "text" : "password"}`}
                    name="password"
                    id="password"
                    className=" w-full h-8 p-2 border border-gray-800 focus:border-none  focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-md"
                    placeholder="Enter your password"
                  />
                  {showPassword ? (
                    <HiEyeSlash
                      className="absolute top-2 right-2 cursor-pointer rounded-full hover:bg-gray-300"
                      size="18"
                      onClick={() => setShowPassword(false)}
                    />
                  ) : (
                    <HiEye
                      className="absolute top-2 right-2 cursor-pointer rounded-full hover:bg-gray-300"
                      size="18"
                      onClick={() => setShowPassword(true)}
                    />
                  )}
                </div>
                <div className="flex justify-between items-center mt-3">
                  <button className=" px-4 py-2 rounded-lg bg-amber-400 border hover:bg-amber-600 transition duration-200">
                    Create an account
                  </button>
                  <span>
                    Already have an account
                    <span
                      className="text-blue-700 ml-1 cursor-pointer hover:underline"
                      onClick={() => {
                        setSignUpState(false);
                        setLoginState(true);
                      }}
                    >
                      Login{" "}
                    </span>
                  </span>
                </div>
              </form>
            </div>
          )}
          {loginState && (
            <div className="flex flex-col gap-5 mt-10">
              <h2 className="text-amber-900 text-xl font-semibold my-4 text-center">
                Login
              </h2>
              <form className="flex flex-col gap-5 px-6 w-[90%] mx-auto ">
                <input
                  type="email"
                  name="email"
                  id="email"
                  className=" h-8 p-2 border border-gray-800 focus:border-none  focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-md"
                  placeholder="Enter your email  "
                />
                <div className="relative">
                  <input
                    type={`${showPassword ? "text" : "password"}`}
                    name="password"
                    id="password"
                    className=" w-full h-8 p-2 border border-gray-800 focus:border-none  focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-md"
                    placeholder="Enter your password"
                  />
                  {showPassword ? (
                    <HiEyeSlash
                      className="absolute top-2 right-2 cursor-pointer rounded-full hover:bg-gray-300"
                      size="18"
                      onClick={() => setShowPassword(false)}
                    />
                  ) : (
                    <HiEye
                      className="absolute top-2 right-2 cursor-pointer rounded-full hover:bg-gray-300"
                      size="18"
                      onClick={() => setShowPassword(true)}
                    />
                  )}
                </div>
                <div className="flex justify-between items-center mt-3">
                  <button className=" px-10 py-2 rounded-lg bg-amber-400 border hover:bg-amber-600 transition duration-200">
                    Login
                  </button>
                  <span
                    className="hover:text-blue-600 cursor-pointer underline text-blue-600 "
                    onClick={() => {
                      setSignUpState(true);
                      setLoginState(false);
                    }}
                  >
                    Create an account
                  </span>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Authentication;
