import React from "react";
import { Link } from "react-scroll";
const NavigationLinks = ({ open }) => {
  return (
    <div
      className={`flex ${open === true ? "flex-col" : ""} md:flex-row ${
        open === true ? "gap-2" : "gap-6"
      } `}
    >
      <Link
        to="home"
        smooth={true}
        duration={500}
        className="font-semibold  border-b-2 border-transparent  hover:border-b-2 hover:border-amber-600 hover:text-amber-600 transition-all duration-200 cursor-pointer  "
      >
        Home
      </Link>
      <Link
        to="menu"
        smooth={true}
        duration={500}
        className="font-semibold  border-b-2 border-transparent  hover:border-b-2 hover:border-amber-600 hover:text-amber-600 transition-all duration-200 cursor-pointer  "
      >
        Menu
      </Link>
      <Link
        to="footer"
        smooth={true}
        duration={500}
        className="font-semibold  border-b-2 border-transparent  hover:border-b-2 hover:border-amber-600 hover:text-amber-600 transition-all duration-200 cursor-pointer   "
      >
        Contact Us
      </Link>
    </div>
  );
};

export default NavigationLinks;
