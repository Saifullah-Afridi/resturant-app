import React from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { IoBagOutline } from "react-icons/io5";

const Navigation = () => {
  return (
    <div className="border-b-2">
      <nav className="max-w-[1300px]   w-[97%] h-[65px]  flex justify-between items-center mx-auto px-2 ">
        <Link to="/">
          <h1 className="text-3xl font-bold text-orange-600 ">Tomato.</h1>
        </Link>
        <div className="hidden  md:flex  items-center  justify-between space-x-10 text-gray-500 text-md font-semibold ">
          <Link
            className="  border-b-2 border-transparent hover:border-b-2 hover:border-gray-600 transition-all duration-100"
            to="/"
          >
            Home
          </Link>
          <Link
            className=" border-b-2 border-transparent hover:border-b-2 hover:border-gray-600 transition-all duration-100"
            to="/menu"
          >
            Menu
          </Link>
          <Link
            className="border-b-2 border-transparent hover:border-b-2 hover:border-gray-600 transition-all duration-100"
            to="contact-us"
          >
            Contact Us
          </Link>
        </div>
        <button className="  md:hidden p-2 bg-amber-400  rounded-full hover:bg-amber-500">
          <FaBars />
        </button>
        <div className=" hidden md:flex items-center   gap-4">
          <button className="p-2 hover:bg-amber-300 rounded-full ">
            <IoSearchOutline />
          </button>
          <button className="p-2 hover:bg-amber-300 rounded-full ">
            <IoBagOutline />
          </button>
          <button className=" border border-amber-600 p-1 px-5 rounded-full hover:bg-amber-300  transition duration-100  ">
            SigIn
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
