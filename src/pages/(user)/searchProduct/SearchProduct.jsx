import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ProductItem from "../../../components/ProductItem";
import api from "../../../api/axios";

const SearchProduct = () => {
  const [searchParams] = useSearchParams();
  const searchedText = searchParams.get("search");
  const [searchProduct, setSearchProduct] = useState([]);

  // fetch search product
  const fetchSearchProduct = async () => {
    try {
      const { status, data } = await api.get(
        `/product/search?searchedText=${searchedText}`
      );
      if (status === 200) {
        setSearchProduct(data.searchedProduct);
      } else {
        toast.error("Failed to fetch search product");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSearchProduct();
  }, [searchedText]);

  return (
    <>
      <section className="pt-32 pb-6 bg-green-700 bg-opacity-15">
        <div className="container">
          <ul className="flex items-center text-lg gap-2 font-medium">
            <li>
              <Link to="/" className="text-color3">
                {" "}
                Home{" "}
              </Link>
            </li>
            /<li>Searched Product</li>
          </ul>
        </div>
      </section>
      <section className="py-20 bg-gray-50">
        <div className="container flex flex-col items-center gap-10">
          <h2 className="text-3xl font-semibold">Searched Products</h2>
          <div className="w-3/4 grid grid-cols-3 gap-8">
            {searchProduct?.map((item, id) => (
              <ProductItem key={id} product={item} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default SearchProduct;
