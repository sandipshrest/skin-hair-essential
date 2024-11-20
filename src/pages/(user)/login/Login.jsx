import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import api from "../../../api/axios";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../redux/reducerSlice/UserSlice";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

const Login = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // function to handle login
  const handleLogin = async (values) => {
    try {
      const response = await api.post("/user/login", values);
      if (response.status === 200) {
        toast.success(response.data.msg);
        response.data.user?.role?.toLowerCase() === "user"
          ? navigate("/")
          : navigate("/dashboard");
        dispatch(
          loginUser({
            token: {
              accessToken: response.data?.tokens?.accessToken,
              refreshToken: response.data?.tokens?.refreshToken,
            },
          })
        );
      } else {
        toast.error(response.data.msg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <section className="pt-32 pb-6 bg-green-700 bg-opacity-15">
        <div className="container">
          <ul className="flex items-center text-lg gap-2 font-medium">
            <li>
              <Link to="/" className="text-color3">
                Home
              </Link>
            </li>
            /<li>Login</li>
          </ul>
        </div>
      </section>
      <section className="py-24 bg-gray-100">
        <div className="container flex items-center justify-center">
          <div className="flex w-[30%] flex-col gap-8 bg-white p-8 shadow-md">
            <h2 className="text-3xl font-semibold text-color3">Login</h2>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={LoginSchema}
              onSubmit={(values) => {
                // same shape as initial values
                handleLogin(values);
              }}
            >
              {({ errors, touched }) => (
                <Form className="w-full flex flex-col items-center gap-8">
                  <div className="w-full relative">
                    <Field
                      name="email"
                      type="email"
                      placeholder="Enter Your Email"
                      className="border border-gray-500 focus:outline-none w-full p-1 rounded-sm"
                    />
                    {errors.email && touched.email ? (
                      <div className="absolute text-sm text-red-700 font-medium">
                        {errors.email}
                      </div>
                    ) : null}
                  </div>
                  <div className="w-full relative">
                    <Field
                      name="password"
                      type={`${showPassword ? "text" : "password"}`}
                      placeholder="Enter Your Password"
                      className={`border p-1 placeholder:font-normal border-gray-500 focus:outline-none w-full rounded-sm ${
                        showPassword ? "" : "font-bold"
                      }`}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute cursor-pointer right-2 text-xs top-1/2 -translate-y-1/2"
                    >
                      {showPassword ? (
                        <FaEye size={16} />
                      ) : (
                        <FaEyeSlash size={16} />
                      )}
                    </span>
                    {errors.password && touched.password ? (
                      <div className="absolute text-sm text-red-700 font-medium">
                        {errors.password}
                      </div>
                    ) : null}
                  </div>
                  <input
                    type="submit"
                    value="Login"
                    className="border cursor-pointer py-1 w-full rounded bg-green-700 text-white font-medium"
                  />
                </Form>
              )}
            </Formik>
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
