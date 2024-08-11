import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "../components/adminHeader/AdminHeader";
import AdminSidebar from "../components/adminSidebar/AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="h-screen flex">
      <AdminSidebar />
      <div className={`flex flex-col flex-1 h-full `}>
        <AdminHeader
        />
        <div className="p-6 w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
