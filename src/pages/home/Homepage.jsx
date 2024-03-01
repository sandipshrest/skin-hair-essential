import React from "react";
import Banner from "./Banner";
import Feature from "./Feature";
import FeatureProduct from "./FeatureProduct";
import Testimonial from "./Testimonial";
import Products from "./Products";

const Homepage = () => {
  return (
    <>
      <Banner />
      <FeatureProduct />
      <Products />
      <Testimonial />
      <Feature />
    </>
  );
};

export default Homepage;
