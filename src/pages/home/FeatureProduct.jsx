import React from "react";
import ProductData from "../../data/ProductData";
import ProductItem from "../../components/ProductItem";

const FeatureProduct = () => {
  const featuredProduct = ProductData.filter(
    (product) => product.isFeatured === true
  );
  return (
    <section className="py-20 bg-gray-50">
      <div className="container flex flex-col items-start gap-10">
        <h2 className="text-3xl font-semibold">Featured Products</h2>
        <div className="w-full grid grid-cols-4 gap-10">
          {featuredProduct?.map((product, productId) => (
            <ProductItem key={productId} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureProduct;