import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../../api/axios";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignUpSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  contact: Yup.number().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
  confirmPassword: Yup.string()
    .required("Required")
    .oneOf([Yup.ref("password")], "Passwords does not match"),
});

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleSignUp = async (values) => {
    try {
      const data = {
        name: values.name,
        email: values.email,
        contact: values.contact,
        password: values.password,
      };

      const response = await api.post("/auth/signup", data);
      if (response.status === 200) {
        toast.success(response.data.msg);
        navigate("/login");
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
            /<li>SignUp</li>
          </ul>
        </div>
      </section>
      <section className="py-24 bg-gray-100">
        <div className="container flex justify-center items-center">
          <div className="w-[30%] bg-white space-y-6 shadow-md p-6">
            <h2 className="text-3xl font-semibold text-color3">Sign Up</h2>
            <Formik
              initialValues={{
                name: "",
                email: "",
                contact: "",
                password: "",
                confirmPassword: "",
              }}
              validationSchema={SignUpSchema}
              onSubmit={(values) => {
                // same shape as initial values
                handleSignUp(values);
              }}
            >
              {({ errors, touched }) => (
                <Form className="w-full flex flex-col items-center gap-8">
                  <div className="w-full relative">
                    <Field
                      name="name"
                      type="text"
                      placeholder="Your Full Name"
                      className="border border-gray-500 focus:outline-none w-full p-1 rounded-sm"
                    />
                    {errors.name && touched.name ? (
                      <div className="absolute text-sm text-red-700 font-medium">
                        {errors.name}
                      </div>
                    ) : null}
                  </div>
                  <div className="w-full relative">
                    <Field
                      name="email"
                      type="email"
                      placeholder="Your Email"
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
                      name="contact"
                      type="text"
                      placeholder="Your Contact"
                      className="border border-gray-500 focus:outline-none w-full p-1 rounded-sm"
                    />
                    {errors.contact && touched.contact ? (
                      <div className="absolute text-sm text-red-700 font-medium">
                        {errors.contact}
                      </div>
                    ) : null}
                  </div>
                  <div className="w-full relative">
                    <Field
                      name="password"
                      type={`${showPassword ? "text" : "password"}`}
                      placeholder="Enter Password"
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
                  <div className="w-full relative">
                    <Field
                      name="confirmPassword"
                      type={`${showConfirmPassword ? "text" : "password"}`}
                      placeholder="Enter Password"
                      className={`border p-1 placeholder:font-normal border-gray-500 focus:outline-none w-full rounded-sm ${
                        showConfirmPassword ? "" : "font-bold"
                      }`}
                    />
                    <span
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute cursor-pointer right-2 text-xs top-1/2 -translate-y-1/2"
                    >
                      {showConfirmPassword ? (
                        <FaEye size={16} />
                      ) : (
                        <FaEyeSlash size={16} />
                      )}
                    </span>
                    {errors.confirmPassword && touched.confirmPassword ? (
                      <div className="absolute text-sm text-red-700 font-medium">
                        {errors.confirmPassword}
                      </div>
                    ) : null}
                  </div>
                  <input
                    type="submit"
                    value="SignUp"
                    className="border cursor-pointer py-1 w-full rounded bg-green-700 text-white font-medium"
                  />
                </Form>
              )}
            </Formik>
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
