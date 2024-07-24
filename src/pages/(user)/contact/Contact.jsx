import React from "react";
import { Link } from "react-router-dom";

const Contact = () => {
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
            /<li>Contact</li>
          </ul>
        </div>
      </section>
      <section className="md:py-24 py-20 bg-gray-50">
        <div className="container flex flex-col items-center gap-14">
          <h2 className="sm:text-3xl text-2xl font-semibold">Get In Touch</h2>
          <div className="flex lg:flex-row flex-col lg:gap-10 gap-20 xl:w-9/12 w-full">
            <div className="lg:w-1/2 md:w-10/12 mx-auto w-full">
              <div className="flex flex-col items-start gap-4 px-5 py-6 shadow-[0_0_5px_1px_rgba(0,0,0,0.1)] rounded-md bg-white lg:sticky top-32">
                <h3 className="sm:text-2xl text-xl font-semibold">
                  Send Feedback
                </h3>
                <form className="flex flex-col items-center gap-2 w-full sm:text-base text-sm">
                  <div className="flex flex-row sm:gap-5 gap-2 w-full">
                    <div className="flex flex-col items-start w-1/2">
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="border border-gray-500 p-1 rounded w-full text-gray-600 focus:outline-none bg-gray-50"
                      />
                    </div>
                    <div className="flex flex-col items-start w-1/2">
                      <label htmlFor="mobile">Phone</label>
                      <input
                        type="tel"
                        id="mobile"
                        name="mobile"
                        required
                        className="border border-gray-500 p-1 rounded w-full text-gray-600 focus:outline-none bg-gray-50"
                      />
                    </div>
                  </div>
                  <div className="flex flex-row sm:gap-5 gap-2 w-full">
                    <div className="flex flex-col items-start w-1/2">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="border border-gray-500 p-1 rounded w-full text-gray-600 focus:outline-none bg-gray-50"
                      />
                    </div>
                    <div className="flex flex-col items-start w-1/2">
                      <label htmlFor="subject">Subject</label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        className="border border-gray-500 p-1 rounded w-full text-gray-600 focus:outline-none bg-gray-50"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col items-start w-full">
                    <label htmlFor="message">Message</label>
                    <textarea
                      type="text"
                      id="message"
                      name="message"
                      rows="5"
                      className="border border-gray-500 p-1 rounded w-full text-gray-600 focus:outline-none bg-gray-50"
                    />
                  </div>
                  <input
                    type="submit"
                    value="SUBMIT"
                    className="font-medium text-white border border-green-700 bg-green-700 w-full py-1 rounded cursor-pointer transition-all duration-200 ease-linear"
                  />
                </form>
              </div>
            </div>
            <div className="lg:w-1/2 w-full flex flex-col items-start gap-8 lg:order-none order-1">
              <h3 className="sm:text-2xl text-xl font-semibold">
                Contact Info
              </h3>
              <div className="w-full space-y-4">
                <div className="flex items-center gap-3 shadow-lg bg-white p-4 ">
                  <span className="text-white sm:p-[6px] p-1 bg-black text-sm">
                    <i className="fa-solid fa-location-dot"></i>
                  </span>
                  <span>
                    <p className="sm:text-lg text-base font-semibold">
                      Location
                    </p>
                    <p className="text-gray-700 sm:text-base text-sm">
                      Kalimati Kathmandu, Nepal
                    </p>
                  </span>
                </div>
                <div className="flex items-center gap-3 shadow-lg bg-white p-4 ">
                  <span className="text-white sm:p-[6px] p-1 bg-black text-sm">
                    <i className="fa-solid fa-phone"></i>
                  </span>
                  <span>
                    <p className="sm:text-lg text-base font-semibold">
                      Contact
                    </p>
                    <p className="text-gray-700 sm:text-base text-sm">
                      +977-9869134475
                    </p>
                  </span>
                </div>
                <div className="flex items-center gap-3 shadow-lg bg-white p-4 ">
                  <span className="text-white sm:p-[6px] p-1 bg-black text-sm">
                    <i className="fa-solid fa-envelope"></i>
                  </span>
                  <span>
                    <p className="sm:text-lg text-base font-semibold">Email</p>
                    <p className="text-gray-700 sm:text-base text-xs">
                      sandip@gmail.com
                    </p>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-4">
        <iframe
          className="w-full h-96"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7065.180241798313!2d85.28691409539242!3d27.699060454098383!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1860ae22d385%3A0x7c2444e8284cef52!2sKalimati%2C%20Kathmandu%2044600!5e0!3m2!1sen!2snp!4v1709634771373!5m2!1sen!2snp"
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>
    </>
  );
};

export default Contact;
