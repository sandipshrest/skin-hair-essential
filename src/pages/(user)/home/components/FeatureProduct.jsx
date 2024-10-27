import React, { useEffect, useState } from "react";
import ProductData from "../../../../data/ProductData";
import ProductItem from "../../../../components/ProductItem";
import api from "../../../../api/axios";
import toast from "react-hot-toast";

const FeatureProduct = () => {
  const [productList, setProductList] = useState([]);

  const fetchFeaturedProduct = async () => {
    try {
      const response = await api.get("/product/featured");
      if (response.status === 200) {
        setProductList(response.data.featuredProduct);
      } else {
        toast.error("Failed to fetch product data");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFeaturedProduct();
  }, []);

  return (
    <section className="py-24 bg-white">
      <div className="container flex flex-col items-start gap-10">
        <h2 className="text-3xl font-semibold">Featured Products</h2>
        <div className="w-full grid grid-cols-4 gap-10">
          {productList?.slice(0, 4).map((product, productId) => (
            <ProductItem key={productId} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureProduct;
