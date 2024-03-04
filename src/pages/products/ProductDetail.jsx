import React from "react";
import { useParams } from "react-router-dom";
import ProductData from "../../data/ProductData";
import ProductItem from "../../components/ProductItem";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist } from "../../redux/reducerSlice/WishlistSlice";
import { addToCart } from "../../redux/reducerSlice/CartSlice";

const ProductDetail = () => {
  const { productName } = useParams();
  const productDetail = ProductData.find(
    (item) => item.productName === productName
  );
  const similarProducts = ProductData.filter(
    (item) =>
      item.category === productDetail?.category &&
      item.productName !== productName
  );

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
    <>
      <section className="py-20"></section>
      <section className="py-24 bg-gray-100">
        {productDetail && (
          <div className="container flex gap-14">
            <div className="w-1/3 px-6">
              <div className="w-full sticky top-28">
              <img
                src={productDetail.image}
                alt={productName}
                className="w-full h-[450px] object-contain bg-color2 bg-opacity-20"
              />
              </div>
            </div>
            <div className="w-2/3 flex flex-col gap-12">
              <div className="flex flex-col gap-2">
                <small className="text-base font-medium text-gray-700">
                  {productDetail.category}
                </small>
                <h2 className="text-4xl font-semibold">
                  {productDetail.productName}
                </h2>
                <p>{productDetail.desc}</p>
                <p className="text-lg font-semibold">
                  Imported From: {productDetail.companyName}
                </p>
                <b className="text-xl font-bold">
                  Price: {productDetail.price}
                </b>
                <div className="flex items-center gap-3 mt-3 text-lg">
                  <button
                    disabled={isItemInCart(productDetail)}
                    onClick={() => dispatch(addToCart(productDetail))}
                    className={`py-1 px-2 text-white transition-all duration-200 ease-linear ${
                      isItemInCart(productDetail)
                        ? "bg-green-500"
                        : "bg-green-700"
                    }`}
                  >
                    Add To Cart
                  </button>
                  <button
                    disabled={isItemInWishlist(productDetail)}
                    onClick={() => dispatch(addToWishlist(productDetail))}
                    className={`py-1 px-2 bg-color3 text-white transition-all duration-200 ease-linear ${
                      isItemInWishlist(productDetail)
                        ? "bg-opacity-80"
                        : "bg-opacity-100"
                    }`}
                  >
                    Add To Wishlist
                  </button>
                </div>
              </div>
              <div className="bg-white w-full p-5 shadow-md space-y-5">
                <h3 className="text-xl font-semibold">Give Feedback</h3>
                <form className="w-1/2 space-y-1">
                  <textarea
                    name=""
                    id=""
                    rows="6"
                    placeholder="Write something ..."
                    className="border border-gray-500 p-1 rounded focus:outline-none w-full"
                  ></textarea>
                  <input type="submit" value="Submit" className="py-1 px-2 bg-green-700 font-medium border border-green-700 text-white" />
                </form>
              </div>
            </div>
          </div>
        )}
      </section>
      {similarProducts.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="container flex flex-col items-center gap-10">
            <h2 className="text-3xl font-semibold">Similar Products</h2>
            <div className="w-3/4 grid grid-cols-3 gap-8">
              {similarProducts.slice(0, 3).map((item, id) => (
                <ProductItem key={id} product={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ProductDetail;
