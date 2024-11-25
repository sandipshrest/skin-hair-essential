import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../redux/reducerSlice/CartSlice";
import { addToWishlist } from "../redux/reducerSlice/WishlistSlice";

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const wishlistItems = useSelector((state) => state.wishlist);

  const isItemInCart = (item) => {
    return cartItems?.some((cartItem) => cartItem.id === item.id);
  };

  const isItemInWishlist = (item) => {
    return wishlistItems?.some((wishlistItem) => wishlistItem.id === item.id);
  };

  return (
    <div className="flex flex-col group rounded overflow-hidden border bg-white hover:shadow-md">
      <div className="relative w-full h-auto overflow-hidden">
        <Link
          to={`/products/${product.productName}?id=${product._id}`}
          className="inline-block w-full h-auto"
        >
          <img
            src={product.productImages?.[0]}
            alt={product.productName}
            className="w-full h-[400px] object-contain bg-color1 bg-opacity-25"
          />
        </Link>
        <button
          disabled={isItemInWishlist(product)}
          onClick={() => dispatch(addToWishlist(product))}
          className={`absolute top-2 right-2 text-xl transition-all duration-200 ease-linear ${
            isItemInWishlist(product) ? "text-red-600" : "text-white"
          }`}
        >
          <i className="fa-solid fa-heart"></i>
        </button>
        <button
          disabled={isItemInCart(product)}
          onClick={() => dispatch(addToCart(product))}
          className={`absolute py-2 text-center w-full text-white text-lg left-0 -bottom-12 group-hover:bottom-0 transition-all duration-200 ease-linear ${
            isItemInCart(product) ? "bg-gray-800" : "bg-black"
          } `}
        >
          Add to Cart
        </button>
      </div>
      <div className="p-3 space-y-1">
        <small className="text-base font-medium text-gray-800">
          {product?.category.category}
        </small>
        <h3 className="text-xl font-semibold text-color3">
          {product?.productName}
        </h3>
        <p className="text-lg font-semibold text-gray-900">{product.price}</p>
      </div>
    </div>
  );
};

export default ProductItem;
