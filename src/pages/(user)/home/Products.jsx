import React from "react";
import ProductData from "../../../data/ProductData";
import ProductItem from "../../../components/ProductItem";

const Products = () => {
  const productItems = [...ProductData];
  return (
    <section className="py-24 bg-gray-50">
      <div className="container flex flex-col items-center gap-14">
        <h2 className="text-3xl font-semibold">Latest Products</h2>
        <div className="w-full grid grid-cols-4 gap-10">
          {productItems?.reverse().map((item, id) => (
            <ProductItem key={id} product={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
