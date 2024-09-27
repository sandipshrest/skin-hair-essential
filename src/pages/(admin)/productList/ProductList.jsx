import React from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  return (
    <div>
      <Link
        to="/dashboard/product"
        className="inline-block py-1 px-2 bg-black text-white font-medium"
      >
        Add Product
      </Link>
      Hello world, I am product list
    </div>
  );
};

export default ProductList;
