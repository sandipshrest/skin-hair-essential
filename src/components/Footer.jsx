import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const date = new Date().getFullYear();
  return (
    <footer className="relative bg-green-100 pb-5 pt-32">
      <div className="container">
        <div className="w-full grid grid-cols-4 gap-10 pb-8">
          <div className="flex flex-col items-center gap-4 ">
            <img
              src="/images/logo.png"
              alt="logo"
              className="w-24 object-contain"
            />
            <div className="flex items-center gap-3">
              <a href="#" className="flex p-2 size-7 rounded-full bg-white border border-gray-500 items-center justify-center">
                <i class="fa-brands fa-facebook-f"></i>
              </a>
              <a href="#" className="flex p-2 size-7 rounded-full bg-white border border-gray-500 items-center justify-center">
                <i class="fa-brands fa-instagram"></i>
              </a>
              <a href="#" className="flex p-2 size-7 rounded-full bg-white border border-gray-500 items-center justify-center">
                <i class="fa-brands fa-youtube"></i>
              </a>
            </div>
          </div>
          <div className="flex flex-col items-start gap-2">
            <h3 className="text-xl font-semibold">Quick Links</h3>
            <ul className="font-medium">
              <li>
                <Link to={"#"}>About</Link>
              </li>
              <li>
                <Link to={"#"}>Shop</Link>
              </li>
              <li>
                <Link to={"#"}>Blog</Link>
              </li>
              <li>
                <Link to={"#"}>Contact</Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-start gap-2">
            <h3 className="text-xl font-semibold">Contact</h3>
          </div>
          <div className="flex flex-col items-start gap-2">
            <h3 className="text-xl font-semibold">Newsletter</h3>
          </div>
        </div>
        <div className="pt-5 border-t border-gray-400">
          <p className="text-center">
            Copyright &copy; {date} Skin N Hair Essentials. All rights reserved.{" "}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
