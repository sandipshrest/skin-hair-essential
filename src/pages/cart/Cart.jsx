import React from "react";
import { Link } from "react-router-dom";

const Cart = () => {
  return (
    <section className="py-28 bg-gray-100">
      <div className="container">
        <div className="py-60 flex flex-col items-center gap-3">
          <h2 className="text-2xl font-semibold">No Items In Cart</h2>
          <Link to="/" className="bg-green-600 text-white py-1 px-2">
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Cart;
