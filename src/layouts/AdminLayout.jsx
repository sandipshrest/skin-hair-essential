import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "../components/adminHeader/AdminHeader";
import AdminSidebar from "../components/adminSidebar/AdminSidebar";

const AdminLayout = () => {
  const [closeSidebar, setCloseSidebar] = useState(false);
  return (
    <div className="h-screen flex">
      <AdminSidebar styles={`${closeSidebar ? "-left-[200px]" : "left-0"}`} />
      <div
        className={`flex flex-col flex-1 h-full ${
          closeSidebar ? "w-screen" : ""
        } `}
      >
        <AdminHeader
          closeSidebar={closeSidebar}
          setCloseSidebar={setCloseSidebar}
        />
        <div className="p-6 w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
