import React from "react";

const Footer = () => {
  const date = new Date().getFullYear();
  return (
    <footer className="py-5">
      <div className="container">
        <div className="w-full grid grid-cols-4 gap-10">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
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
