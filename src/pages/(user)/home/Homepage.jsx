import React from "react";
import Banner from "./components/Banner";
import Feature from "./components/Feature";
import FeatureProduct from "./components/FeatureProduct";
import Testimonial from "./components/Testimonial";
import Products from "./components/Products";
import Ad from "./components/Ad";

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
