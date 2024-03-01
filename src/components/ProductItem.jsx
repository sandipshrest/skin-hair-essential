import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../redux/reducerSlice/CartSlice";

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col group rounded overflow-hidden border bg-white hover:shadow-md">
      <div className="relative w-full h-auto overflow-hidden">
        <Link
          to={`/products/${product.productName}`}
          className="inline-block w-full h-auto"
        >
          <img
            src={product.image}
            alt={product.productName}
            className="w-full h-[400px] object-contain bg-color1 bg-opacity-25"
          />
        </Link>
        <button className="absolute top-2 right-2 text-white text-xl">
          <i className="fa-solid fa-heart"></i>
        </button>
        <button
          onClick={() => dispatch(addToCart(product))}
          className="absolute py-2 text-center w-full bg-black text-white text-lg left-0 -bottom-12 group-hover:bottom-0 transition-all duration-200 ease-linear"
        >
          Add to Cart
        </button>
      </div>
      <div className="p-3 space-y-1">
        <small className="text-base font-medium text-gray-800">
          {product.category}
        </small>
        <h3 className="text-xl font-semibold text-color3">
          {product.productName}
        </h3>
        <p className="text-lg font-semibold text-gray-900">{product.price}</p>
      </div>
    </div>
  );
};

export default ProductItem;
