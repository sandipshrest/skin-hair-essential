import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LuSearch } from "react-icons/lu";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { BsCart3 } from "react-icons/bs";
import ProductData from "../data/ProductData";
import { useSelector } from "react-redux";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [productMenu, setProductMenu] = useState(false);
  const cartItems = useSelector((state) => state.cart);
  const wishlistItems = useSelector((state) => state.wishlist);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    setScrolled(scrollTop > 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const categoryData = {};

  ProductData?.forEach((product) => {
    if (!categoryData[product.category]) {
      categoryData[product.category] = {
        category: product.category,
        thumbnailImage: product.image,
        products: [product],
      };
    } else {
      categoryData[product.category].products.push(product);
    }
  });

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-200 ease-linear ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div
        className={`container relative flex items-center justify-between ${
          productMenu ? "overflow-visible" : "overflow-hidden"
        }`}
      >
        <div className="flex items-center gap-32">
          <Link to="/">
            <img src="/images/logo.png" alt="logo" className="size-20" />
          </Link>
          <nav>
            <ul className="flex items-center gap-6 text-lg font-medium">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li
                className={`py-10 h-auto`}
                onMouseLeave={() => setProductMenu(false)}
              >
                <button onMouseEnter={() => setProductMenu(true)}>Shop</button>
                <div
                  className={`bg-white w-full absolute left-0 border border-gray-300 px-8 py-6 transition-all duration-300 ease-linear ${
                    productMenu
                      ? "top-[108px] opacity-100"
                      : "top-[120px] opacity-0"
                  }`}
                >
                  <div className="w-full grid grid-cols-5 gap-8">
                    {Object.values(categoryData).map((item, id) => (
                      <div key={id} className="flex flex-col gap-4">
                        <img
                          src={item.thumbnailImage}
                          alt={item.category}
                          className="w-full h-48 bg-green-100 object-contain"
                        />
                        <div className="flex flex-col gap-2 grow justify-between">
                          <h3 className="text-xl font-semibold border-b border-gray-400">
                            {item.category}
                          </h3>
                          <ul className="text-base">
                            {item.products
                              .slice(0, 4)
                              .map((productItem, productId) => (
                                <li key={productId}>
                                  <Link
                                    onClick={() => setProductMenu(false)}
                                    to={`/products/${productItem.productName}`}
                                    className="inline-block w-full p-[2px] hover:bg-gray-100"
                                  >
                                    {productItem.productName}
                                  </Link>
                                </li>
                              ))}
                          </ul>
                          <Link
                            onClick={() => setProductMenu(false)}
                            to={`/categories/${item.category}`}
                            className="text-base text-gray-600 underline"
                          >
                            View More
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </li>
              <li>
                <Link to="#">Blog</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex items-center gap-8 text-lg">
          <div className="w-auto relative">
            <input
              type="text"
              placeholder="Search product..."
              className="bg-white py-[6px] px-3 w-80 text-black placeholder:text-black text-sm focus:outline-none border border-gray-600 bg-opacity-60 rounded-2xl"
            />
            <button className="absolute top-1/2 -translate-y-1/2 right-3">
              <LuSearch className="text-xl" />
            </button>
          </div>
          <Link to="/cart" className="relative">
            <BsCart3 />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 size-4 bg-red-600 text-xs text-white rounded-full flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Link>
          <Link to="/wishlist" className="relative">
            <FaRegHeart />
            {wishlistItems.length > 0 && (
              <span className="absolute -top-2 -right-2 size-4 bg-red-600 text-xs text-white rounded-full flex items-center justify-center">
                {wishlistItems.length}
              </span>
            )}
          </Link>
          <Link to="/login">
            <FaRegUser />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
