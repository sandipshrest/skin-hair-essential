import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="py-3">
      <div className="container flex items-center justify-between">
        <Link to="/">
          <img src="#" alt="logo" />
        </Link>
        <div>
          <input
            type="text"
            placeholder="search here"
            className="border border-black rounded p-1"
          />
        </div>
        <nav>
          <ul className="flex items-center gap-6 text-lg font-medium">
            <li>
              <Link to="#">Home</Link>
            </li>
            <li>
              <Link to="#">About</Link>
            </li>
            <li>
              <Link to="#">Products</Link>
            </li>
            <li>
              <Link to="#">Categories</Link>
            </li>
            <li>
              <Link to="#">Contact</Link>
            </li>
          </ul>
        </nav>
        <div className="flex items-center gap-4">
          <button>Cart</button>
          <button>Wishlist</button>
          <button>Login</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
