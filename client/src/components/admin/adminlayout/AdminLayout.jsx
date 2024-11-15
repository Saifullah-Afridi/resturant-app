import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex ">
      <Sidebar />
      <div className="w-[80%] min-h-screen bg-[#FAF3E0]">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
