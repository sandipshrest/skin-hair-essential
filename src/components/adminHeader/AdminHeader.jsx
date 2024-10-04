import React from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";

const AdminHeader = () => {
  return (
    <header className="py-4 bg-gray-200 w-full">
      <div className="container flex w-full items-center justify-between">
        <Link to="/dashboard">
          <img src="/images/logo.png" alt="logo" className="size-16" />
        </Link>
        {/* <button onClick={() => setCloseSidebar(!closeSidebar)}>
          <FaBars className="text-xl" />
        </button> */}
      </div>
    </header>
  );
};

export default AdminHeader;
