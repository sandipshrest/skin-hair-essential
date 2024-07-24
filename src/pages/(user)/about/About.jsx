import React from "react";
import { Link } from "react-router-dom";

const About = () => {
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
            /<li>About</li>
          </ul>
        </div>
      </section>
      <section className="py-24">
        <div className="container flex flex-col items-center gap-10">
          <h2 className="text-3xl font-semibold">About Us</h2>
          <div className="text-center">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
              veritatis sed expedita architecto illum explicabo ex harum
              delectus, laudantium quaerat, eius facilis? Laborum, dicta
              eligendi quam quis quibusdam modi fuga dolores fugit eius vero
              officiis vitae veritatis provident saepe ipsa beatae! Ipsa labore
              asperiores voluptate error suscipit, vero impedit dolores dolor
              inventore distinctio temporibus odio quam incidunt? Cumque, earum
              expedita quia vitae molestias adipisci impedit, quibusdam placeat
              voluptas praesentium aliquam pariatur quam, fugiat laboriosam
              distinctio alias tempore dolor sint libero. Harum reiciendis
              voluptatum aut nostrum sunt fuga. Itaque, aut. Ea similique sequi
              id beatae libero iusto dolor eligendi mollitia alias. Lorem ipsum
              dolor sit amet, consectetur adipisicing elit. Quasi unde debitis
              beatae necessitatibus voluptatibus explicabo repudiandae officia
              soluta, saepe harum exercitationem eveniet, eum repellendus
              accusamus suscipit cum maxime, optio praesentium? Ab voluptates,
              officiis fugit, totam vel architecto porro dolorem similique
              perferendis mollitia et. Est et, quisquam id alias nemo tenetur?
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
