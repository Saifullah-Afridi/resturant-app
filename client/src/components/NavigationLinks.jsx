import React from "react";
import { Link } from "react-router-dom";

const NavigationLinks = ({ open }) => {
  return (
    <div
      className={`flex ${open === true ? "flex-col" : ""} md:flex-row ${
        open === true ? "gap-2" : "gap-6"
      } `}
    >
      <Link className="font-semibold  border-b-2 border-transparent  hover:border-b-2 hover:border-amber-600 hover:text-amber-600 transition-all duration-200  ">
        Home
      </Link>
      <Link className="font-semibold  border-b-2 border-transparent  hover:border-b-2 hover:border-amber-600 hover:text-amber-600 transition-all duration-200 ">
        Menu
      </Link>
      <Link className="font-semibold  border-b-2 border-transparent  hover:border-b-2 hover:border-amber-600 hover:text-amber-600 transition-all duration-200  ">
        Contact Us
      </Link>
    </div>
  );
};

export default NavigationLinks;
