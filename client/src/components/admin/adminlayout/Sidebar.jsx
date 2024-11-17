import { useState } from "react";
import { HiInboxStack, HiMiniArrowDown, HiMiniArrowUp } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="w-[22%] min-h-screen  bg-[#3E4A59] px-2">
      {/* logo container */}
      <div>
        <h1 className="text-3xl mt-3 ml-1 pb-1 text-[#E67E22] font-semibold  border-b-2 border-b-amber-600 tracking-widest cursor-pointer" onClick={()=>navigate("/")}>
          Tomato
        </h1>
        <Link to="categories">
          <div className="mt-5 flex items-center  text-[#FFFFFF] justify-between py-3 px-1 bg-[#E67E22] hover:bg-[#27AE60]  rounded-sm cursor-pointer">
            <div className="flex items-center gap-2">
              <HiInboxStack color="#BDC3C7" />
              <h3 className=" font-semibold tracking-wide text-md">
                Categories Management
              </h3>
            </div>
          </div>
        </Link>
        <Link to="dishes">
          <div className="mt-2 flex items-center  text-[#FFFFFF] justify-between py-3 px-1 bg-[#E67E22] hover:bg-[#27AE60]  rounded-sm cursor-pointer">
            <div className="flex items-center gap-2">
              <HiInboxStack color="#BDC3C7" />
              <h3 className=" font-semibold tracking-wide text-md">
                dishes Management
              </h3>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
