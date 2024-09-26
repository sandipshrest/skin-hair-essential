import { cn } from "../lib/utils";
import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import AdminHeader from "../components/adminHeader/AdminHeader";
import AdminSidebar from "../components/adminSidebar/AdminSidebar";
import { Sidebar, SidebarBody } from "../ui/AnimatedSidebar";

export default function AdminLayout() {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-white w-full flex-1 mx-auto border border-neutral-200 overflow-hidden",
        "h-screen"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <AdminSidebar open={open} />
        </SidebarBody>
      </Sidebar>
      <div className="flex flex-col w-full">
        <AdminHeader />
        <Outlet />
      </div>
    </div>
  );
}
