import React from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <>
      <section className="pt-32 pb-6 bg-green-700 bg-opacity-15">
        <div className="container">
          <ul className="flex items-center text-lg gap-2 font-medium">
            <li>
              <Link to="/" className="text-color3">
                {" "}
                Home{" "}
              </Link>
            </li>
            /<li>Profile</li>
          </ul>
        </div>
      </section>
      <section className="py-24 bg-gray-100">
        <div className="container">Hello World</div>
      </section>
    </>
  );
};

export default Profile;
