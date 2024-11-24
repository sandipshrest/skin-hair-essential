import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";
import { MdDashboard, MdPeopleAlt } from "react-icons/md";
import { GrCatalogOption } from "react-icons/gr";
import { RiFeedbackFill } from "react-icons/ri";
import { FiShoppingCart } from "react-icons/fi";
import { FaAngleDown } from "react-icons/fa6";

const AdminSidebar = ({ open }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  return (
    <aside className={`w-full py-16 h-full relative`}>
      <nav>
        <ul className="flex flex-col items-start gap-5 font-medium">
          <li className={cn("w-full group/sidebar")}>
            <Link className="w-full flex items-center gap-2" to="/dashboard">
              <MdDashboard size={24} />
              {open && <p>Dashboard</p>}
            </Link>
          </li>
          <li
            className={cn("w-full group/sidebar space-y-2")}
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <button className="w-full text-start flex items-center gap-2">
              <GrCatalogOption size={24} />
              {open && (
                <p className="w-full flex items-center justify-between gap-3">
                  Catalog
                  <FaAngleDown
                    size={16}
                    className={`${
                      showDropdown && "rotate-180"
                    } transition-all duration-200 ease-linear`}
                  />
                </p>
              )}
            </button>
            <div
              className={` ${
                showDropdown ? "h-[130px]" : "h-0 overflow-hidden"
              } bg-black text-white transition-all duration-200 ease-linear`}
            >
              <ul className="flex flex-col items-start gap-2 p-4">
                <li className="w-full">
                  <Link
                    className="w-full inline-block"
                    to="/dashboard/productList"
                  >
                    Product List
                  </Link>
                </li>
                <li className="w-full">
                  <Link className="w-full inline-block" to="/dashboard/product">
                    Product
                  </Link>
                </li>
                <li className="w-full">
                  <Link
                    className="w-full inline-block"
                    to="/dashboard/categoryList"
                  >
                    Category List
                  </Link>
                </li>
              </ul>
            </div>
          </li>
          <li className={cn("w-full group/sidebar")}>
            <Link className="w-full flex items-center gap-2" to="/dashboard/feedbackList">
              <RiFeedbackFill size={24} />
              {open && <p>Feedbacks</p>}
            </Link>
          </li>
          <li className={cn("w-full group/sidebar")}>
            <Link className="w-full flex items-center gap-2" to="">
              <MdPeopleAlt size={24} />
              {open && <p>Customers</p>}
            </Link>
          </li>
          <li className={cn("w-full group/sidebar")}>
            <Link className="w-full flex items-center gap-2" to="">
              <FiShoppingCart size={24} />
              {open && <p>Order</p>}
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
