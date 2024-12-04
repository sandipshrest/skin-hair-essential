import React from "react";
import Banner from "./components/Banner";
import Feature from "./components/Feature";
import FeatureProduct from "./components/FeatureProduct";
import Testimonial from "./components/Testimonial";
import Products from "./components/Products";
import Ad from "./components/Ad";
import { Helmet } from "react-helmet";

const Homepage = () => {
  return (
    <>
      <Helmet>
        <title>Skin N Hair Essentials | Home</title>
        <meta
          name="description"
          content="Explore Skin N Hair Essentials, your go-to brand for a diverse range of high-quality skin and hair care products. Our offerings are safe and effective for all skin and hair types."
        />
        <meta
          name="keywords"
          content="Skin N Hair, Glow Skin, Healthy Hair, Skin Care, Hair Care, Natural Products, Beauty Products"
        />
        <meta name="author" content="Skin N Hair Essentials" />
      </Helmet>
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
