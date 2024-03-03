import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
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
              <input
                type="password"
                placeholder="Enter Your Password"
                className="border border-gray-500 focus:outline-none w-full p-1 rounded-sm"
              />
              <input
                type="submit"
                value="Login"
                className="border cursor-pointer py-1 w-full rounded bg-green-700 text-white font-medium"
              />
            </form>
            <p>
              Don't have an account?{" "}
              <Link to="#" className="text-color3 font-medium underline">
                {" "}
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
