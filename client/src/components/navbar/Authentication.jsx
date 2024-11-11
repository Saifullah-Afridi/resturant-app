import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

const Authentication = ({
  loginState,
  setLoginState,
  signupState,
  setSignUpState,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        className="hidden md:block border-[1px] rounded-3xl border-amber-500 py-[5px]  px-5 hover:bg-amber-300 transition-all duration-300"
        onClick={() => setOpen}
      >
        Sign In
      </button>
    </>
  );
};

export default Authentication;
