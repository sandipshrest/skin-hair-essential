import React, { useEffect, useState } from "react";
import ProductData from "../../../../data/ProductData";
import ProductItem from "../../../../components/ProductItem";
import api from "../../../../api/axios";
import toast from "react-hot-toast";

const Products = () => {
  const [productList, setProductList] = useState([]);

  const fetchProductData = async () => {
    try {
      const response = await api.get("/product");
      if (response.status === 200) {
        setProductList(response.data.productList);
      } else {
        toast.error("Failed to fetch product data");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  return (
    <section className="py-24 bg-gray-50">
      <div className="container flex flex-col items-center gap-14">
        <h2 className="text-3xl font-semibold">Latest Products</h2>
        <div className="w-full grid grid-cols-4 gap-10">
          {productList?.map((item, id) => (
            <ProductItem key={id} product={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
