import React from "react";
import { Link } from "react-router-dom";

const FooterCol2 = () => {
  return (
    <div className="flex flex-col flex-1 gap-3">
      <h3 className="text-white text-xl font-semibold">Company</h3>
      <div className="flex flex-col gap-1 ">
        <Link to="/">Home</Link>
        <Link to="">About Us</Link>
        <Link to="">Contact Us</Link>
      </div>
    </div>
  );
};

export default FooterCol2;
