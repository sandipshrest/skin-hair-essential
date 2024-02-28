import React from "react";
import { useParams } from "react-router-dom";
import ProductData from "../../data/ProductData";
import ProductItem from "../../components/ProductItem";

const ProductDetail = () => {
  const { productName } = useParams();
  const productDetail = ProductData.find(
    (item) => item.isFeatured === true && item.productName === productName
  );
  const similarProducts = ProductData.filter(
    (item) => item.isFeatured === true && item.productName !== productName
  );
  return (
    <>
      <section className="py-20"></section>
      <section className="py-24 bg-gray-100">
        {productDetail && (
          <div className="container flex gap-14">
            <div className="w-1/3 px-6">
              <img
                src={productDetail.image}
                alt={productName}
                className="w-full h-[450px] object-contain bg-color2 bg-opacity-20"
              />
            </div>
            <div className="w-2/3 flex flex-col gap-2">
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
              <b className="text-xl font-bold">Price: {productDetail.price}</b>
              <div className="flex items-center gap-3 mt-3 text-lg">
                <button className="py-1 px-2 bg-green-700 text-white">
                  Add To Cart
                </button>
                <button className="py-1 px-2 bg-color3 text-white">
                  Add To Wishlist
                </button>
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
