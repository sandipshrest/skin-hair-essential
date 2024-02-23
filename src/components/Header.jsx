import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LuSearch } from "react-icons/lu";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { BsCart3 } from "react-icons/bs";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    setScrolled(scrollTop > 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`py-3 fixed w-full top-0 z-50 transition-all duration-200 ease-linear ${scrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-32">
          <Link to="/">
            <img src="/images/logo.png" alt="logo" className="size-16" />
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
                <Link to="#">Shop</Link>
              </li>
              <li>
                <Link to="#">Blog</Link>
              </li>
              <li>
                <Link to="#">Contact</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex items-center gap-8 text-lg">
          <div className="w-auto relative">
            <input
              type="text"
              placeholder="Search product..."
              className="bg-white py-[6px] px-3 w-80 text-black placeholder:text-black text-sm focus:outline-none border border-gray-600 bg-opacity-60 rounded-2xl"
            />
            <button className="absolute top-1/2 -translate-y-1/2 right-3">
              <LuSearch className="text-xl" />
            </button>
          </div>
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
