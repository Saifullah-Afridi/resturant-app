import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex flex-row">
      <Sidebar />
      <div className="w-[80%] bg-[#FAF3E0] px-2 ">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
