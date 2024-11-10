import React from "react";
import { Link } from "react-router-dom";

const FooterCol1 = () => {
  return (
    <div className="flex-1 flex flex-col gap-1">
      <Link
        onClick={() => {
          window.screenTop();
        }}
        to="/"
      >
        <h1 className="cursor-pointer text-2xl font-bold text-amber-500">
          Tomato.
        </h1>
      </Link>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe vitae
        doloremque aliquid non itaque odio dignissimos amet iste sapiente harum.
      </p>
    </div>
  );
};

export default FooterCol1;
