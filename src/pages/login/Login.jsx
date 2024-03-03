import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <section className="py-20"></section>
      <section className="py-24 bg-gray-100">
        <div className="container flex items-center justify-center">
          <div className="flex w-[30%] flex-col gap-8 bg-white p-8 shadow-md">
            <h2 className="text-3xl font-semibold text-color3">Login</h2>
            <form className="w-full flex flex-col items-center gap-6">
              <input
                type="email"
                placeholder="Enter Your Email"
                className="border border-gray-500 focus:outline-none w-full p-1 rounded-sm"
              />
              <div className="w-full relative">
                <input
                  type={`${showPassword ? "text" : "password"}`}
                  placeholder="Enter Your Password"
                  className={`border p-1 placeholder:font-normal border-gray-500 focus:outline-none w-full rounded-sm ${
                    showPassword
                      ? ""
                      : "font-bold"
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
              <input
                type="submit"
                value="Login"
                className="border cursor-pointer py-1 w-full rounded bg-green-700 text-white font-medium"
              />
            </form>
            <p>
              Don't have an account?
              <Link
                to="/signup"
                className="text-color3 font-medium underline ms-[2px]"
              >
                Create New
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
