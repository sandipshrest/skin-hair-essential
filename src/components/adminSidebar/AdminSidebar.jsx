import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  return (
    <aside className={`w-[200px] px-4 py-16 bg-gray-200 h-full relative`}>
      <nav>
        <ul className="flex flex-col items-start gap-5 font-medium">
          <li className="w-full">
            <Link className="w-full inline-block" to="/dashboard">
              Dashboard
            </Link>
          </li>
          <li
            className="w-full"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <button className="w-full text-start">Catalog</button>
            <div
              className={` ${
                showDropdown ? "h-[150px]" : "h-0 overflow-hidden"
              } bg-black text-white transition-all duration-200 ease-linear`}
            >
              <ul className="flex flex-col items-start gap-2 p-4">
                <li className="w-full">
                  <Link className="w-full inline-block" to="/dashboard/productList">
                    Product List
                  </Link>
                </li>
                <li className="w-full">
                  <Link className="w-full inline-block" to="">
                    Product
                  </Link>
                </li>
                <li className="w-full">
                  <Link className="w-full inline-block" to="">
                    Category List
                  </Link>
                </li>
                <li className="w-full">
                  <Link className="w-full inline-block" to="">
                    Category
                  </Link>
                </li>
              </ul>
            </div>
          </li>
          <li className="w-full">
            <Link className="w-full inline-block" to="">
              Customers
            </Link>
          </li>
          <li className="w-full">
            <Link className="w-full inline-block" to="">
              Order
            </Link>
          </li>
          <li className="w-full">
            <Link className="w-full inline-block" to="">
              Marketing
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
