import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LuSearch } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";
import ProductData from "../data/ProductData";
import { useSelector } from "react-redux";
import RightSidebar from "./RightSidebar";
import api from "../api/axios";
import toast from "react-hot-toast";

const Header = () => {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const dropdownRefs = useRef([]);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [productMenu, setProductMenu] = useState(false);
  const { isLogin } = useSelector((state) => state.user);
  const [products, setProducts] = useState([]);
  const [searchProduct, setSearchProduct] = useState([]);
  const [currentSelection, setCurrentSelection] = useState(null);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    setScrolled(scrollTop > 0);
  };

  // handle scroll event
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // fetch products
  const fetchProducts = async () => {
    try {
      const response = await api.get(`/product`);
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
  }, []);

  // categorize products
  const categoryData = {};

  products?.forEach((product) => {
    if (!categoryData[product.category.category]) {
      categoryData[product.category.category] = {
        category: product.category.category,
        thumbnailImage: product.productImages[0],
        products: [product],
      };
    } else {
      categoryData[product.category.category].products.push(product);
    }
  });

  //  search function
  const handleSearch = async () => {
    try {
      if (inputRef.current.value === "") {
        setSearchProduct([]);
        setCurrentSelection(null);
      } else {
        const { status, data } = await api.get(
          `/product/search?productName=${inputRef.current.value}`
        );
        if (status === 200) {
          setSearchProduct(data.searchedProduct);
        } else {
          toast.error("Failed to fetch search product");
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const productSearch = () => {
    navigate(`/searchProduct?search=${inputRef.current.value}`);
    setSearchProduct([]);
  };

  const handleKeyPress = (e) => {
    if (e.key.toLowerCase() === "enter") {
      e.preventDefault();
      productSearch();
    }
  };

  // handle keyboard navigation
  useEffect(() => {
    const handleChange = (e) => {
      if (e.key === "ArrowDown") {
        if (currentSelection === null) {
          setCurrentSelection(0);
        } else if (currentSelection === searchProduct.length - 1) {
          setCurrentSelection(null);
        } else {
          setCurrentSelection(currentSelection + 1);
        }
      } else if (e.key === "ArrowUp") {
        if (currentSelection === 0) {
          setCurrentSelection(null);
        } else if (currentSelection === null) {
          setCurrentSelection(searchProduct.length - 1);
        } else {
          setCurrentSelection(currentSelection - 1);
        }
      }
    };
    if (currentSelection !== null) {
      inputRef.current.value = dropdownRefs.current[currentSelection]?.text;
    }
    window.addEventListener("keydown", handleChange);
    return () => {
      window.removeEventListener("keydown", handleChange);
    };
  }, [currentSelection]);

  return (
    <>
      <header
        className={`fixed w-full top-0 z-50 transition-all duration-200 ease-linear ${
          scrolled ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
        <div className={`container relative flex items-center justify-between`}>
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
                  <button onMouseEnter={() => setProductMenu(true)}>
                    Shop
                  </button>
                  <div
                    className={`bg-white w-full absolute left-0 border border-gray-300 px-8 py-6 transition-all duration-300 ease-linear ${
                      productMenu
                        ? "top-[108px] opacity-100 visible"
                        : "top-[120px] opacity-0 invisible"
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
                                      to={`/products/${productItem.productName}?id=${productItem._id}`}
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
                ref={inputRef}
                onKeyDown={handleKeyPress}
                onChange={handleSearch}
                type="text"
                placeholder="Search product..."
                className="bg-white py-[6px] px-3 w-80 text-black placeholder:text-black text-sm focus:outline-none border border-gray-600 bg-opacity-60 rounded-2xl"
              />
              <button
                onClick={productSearch}
                className="absolute top-1/2 -translate-y-1/2 right-3"
              >
                <LuSearch className="text-xl" />
              </button>
              {searchProduct.length > 0 && (
                <div className="absolute flex flex-col items-start w-full bg-gray-50 shadow-md">
                  {searchProduct.map((item, id) => (
                    <Link
                      ref={(element) => (dropdownRefs.current[id] = element)}
                      onClick={() => setSearchProduct([])}
                      to={`/products/${item.productName}?id=${item._id}`}
                      key={id}
                      className={`inline-block w-full hover:bg-gray-200 p-2 font-medium ${
                        currentSelection === id ? "bg-gray-200" : ""
                      }`}
                    >
                      {item.productName}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            {!isLogin ? (
              <Link to="/login">Login</Link>
            ) : (
              <button onClick={() => setOpen(true)}>
                <FaRegUser size={20} />
              </button>
            )}
          </div>
        </div>
      </header>
      <RightSidebar open={open} setOpen={setOpen} />
    </>
  );
};

export default Header;
