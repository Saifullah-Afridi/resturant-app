import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex flex-row">
      <div className=" w-[22%] h-[100vh]  bg-[#3E4A59] z-[10]"  >

        <Sidebar />
      </div>
      <div className="w-[80%] bg-[#FAF3E0] px-2 ">
        <Outlet />
      </div>
    </div >
  );
};

export default AdminLayout;
