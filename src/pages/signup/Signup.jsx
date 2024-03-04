import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  return (
    <>
      <section className="py-20"></section>
      <section className="py-24 bg-gray-100">
        <div className="container flex justify-center items-center">
          <div className="w-[30%] bg-white space-y-6 shadow-md p-6">
            <h2 className="text-3xl font-semibold text-color3">Sign Up</h2>
            <form className="w-full flex flex-col items-center gap-6">
              <input
                type="text"
                placeholder="Your Fullname"
                className="border border-gray-500 focus:outline-none w-full p-1 rounded-sm"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="border border-gray-500 focus:outline-none w-full p-1 rounded-sm"
              />
              <div className="w-full relative">
                <input
                  type={`${showPassword ? "text" : "password"}`}
                  placeholder="Create Password"
                  className={`border p-1 placeholder:font-normal border-gray-500 focus:outline-none w-full rounded-sm ${
                    showPassword ? "" : "font-bold"
                  }`}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute cursor-pointer right-2 text-xs top-1/2 -translate-y-1/2"
                >
                  <i
                    className={`fa-solid fa-eye${showPassword ? "" : "-slash"}`}
                  ></i>
                </span>
              </div>
              <div className="w-full relative">
                <input
                  type={`${showConfirmPassword ? "text" : "password"}`}
                  placeholder="Confirm Password"
                  className={`border p-1 placeholder:font-normal border-gray-500 focus:outline-none w-full rounded-sm ${
                    showConfirmPassword ? "" : "font-bold"
                  }`}
                />
                <span
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute cursor-pointer right-2 text-xs top-1/2 -translate-y-1/2"
                >
                  <i
                    className={`fa-solid fa-eye${
                      showConfirmPassword ? "" : "-slash"
                    }`}
                  ></i>
                </span>
              </div>
              <input
                type="submit"
                value="Sign Up"
                className="border cursor-pointer py-1 w-full rounded bg-green-700 text-white font-medium"
              />
            </form>
            <p>
              Already have an account?
              <Link
                to="/login"
                className="text-color3 font-medium underline ms-[2px]"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
