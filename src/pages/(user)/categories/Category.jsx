import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductData from "../../../data/ProductData";
import ProductItem from "../../../components/ProductItem";
import api from "../../../api/axios";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

const Category = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);

  // fetch products by category
  const fetchProducts = async () => {
    try {
      const response = await api.get(`/product/category?category=${category}`);
      if (response.status === 200) {
        setProducts(response.data.productList);
      } else {
        toast.error("Failed to fetch products");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [category]);

  return (
    <>
      <Helmet>
        <title>Skin N Hair Essentials | {category} Products</title>
        <meta
          name="description"
          content={`Explore a wide range of ${category} products at Skin N Hair Essentials. Discover quality beauty and natural products tailored for you.`}
        />
        <meta
          name="keywords"
          content={`${category}, Skin N Hair Essentials, Beauty Products, Natural Products`}
        />
        <meta name="author" content="Skin N Hair Essentials" />
      </Helmet>
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
