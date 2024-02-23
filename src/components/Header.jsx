import React from "react";
import { Link } from "react-router-dom";
import { LuSearch } from "react-icons/lu";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { BsCart3 } from "react-icons/bs";

const Header = () => {
  return (
    <header className="py-3 sticky top-0 bg-white z-50">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-32">
          <Link to="/">
            <img src="/images/logo.jpg" alt="logo" className="size-16" />
          </Link>
          <nav>
            <ul className="flex items-center gap-6 text-lg font-medium">
              <li>
                <Link to="#">Home</Link>
              </li>
              <li>
                <Link to="#">About</Link>
              </li>
              <li>
                <Link to="#">Categories</Link>
              </li>
              <li>
                <Link to="#">Contact</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex items-center gap-8 text-lg">
          <button>
            <LuSearch className="text-xl" />
          </button>
          <button>
            <BsCart3 />
          </button>
          <button>
            <FaRegHeart />
          </button>
          <button>
            <FaRegUser />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
