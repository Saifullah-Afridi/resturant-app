import React from "react";
import { Link } from "react-router-dom";
const Navigation = () => {
  return (
    <nav className="max-w-[1300px] w-[90%]">
      <div>
        <h1>Tomato.</h1>
        <div>
          <Link>Home</Link>
          <Link>Menu</Link>
          <Link>Contact Us</Link>
        </div>
        <div></div>
      </div>
    </nav>
  );
};

export default Navigation;
