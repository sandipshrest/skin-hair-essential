import React from "react";
import Banner from "./Banner";
import Feature from "./Feature";
import FeatureProduct from "./FeatureProduct";
import Testimonial from "./Testimonial";
import Products from "./Products";
import Ad from "./Ad";

const Homepage = () => {
  return (
    <>
      <Banner />
      <FeatureProduct />
      <Ad />
      <Products />
      <Testimonial />
      <Feature />
    </>
  );
};

export default Homepage;
