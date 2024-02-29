import React from "react";
import { useParams } from "react-router-dom";
import ProductData from "../../data/ProductData";
import ProductItem from "../../components/ProductItem";

const Category = () => {
  const { category } = useParams();
  const products = ProductData.filter((item) => item.category === category);
  return (
    <>
      <section className="py-20"></section>
      <section className="py-24">
        <div className="container flex flex-col items-center gap-10">
          <h2 className="text-3xl font-semibold">{category} Products</h2>
          <div className="w-full grid grid-cols-4 gap-10">
            {products?.map((item, id) => (
              <ProductItem key={id} product={item} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Category;
