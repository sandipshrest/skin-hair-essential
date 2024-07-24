import React from "react";
import { Link, useParams } from "react-router-dom";
import ProductData from "../../../data/ProductData";
import ProductItem from "../../../components/ProductItem";

const Category = () => {
  const { category } = useParams();
  const products = ProductData.filter((item) => item.category === category);
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
            /<li>{category}</li>
          </ul>
        </div>
      </section>
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
