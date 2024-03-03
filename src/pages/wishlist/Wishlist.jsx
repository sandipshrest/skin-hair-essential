import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const wishlistItems = useSelector((state) => state.wishlist);
  const [quantity, setQuantity] = useState(1);

  return (
    <>
      <section className="py-10 bg-gray-100"></section>
      <section className="py-28 bg-gray-100">
        <div className="container">
          {wishlistItems.length > 0 ? (
            <div className="space-y-8">
              <h2 className="text-3xl font-semibold">Your Wishlist</h2>
              <div className="bg-white">
                <table className="w-full">
                  <thead className="border-b-2">
                    <tr className="text-lg">
                      <th className="text-start ps-4 py-2">Product</th>
                      <th className="text-start ps-4 py-2">Quantity</th>
                      <th className="text-start ps-4 py-2">Price</th>
                      <th className="text-start ps-4 py-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {wishlistItems.map((item, id) => (
                      <tr key={id} className="border-b">
                        <td className="flex flex-col ps-4 py-3">
                          <img
                            src={item.image}
                            alt={item.productName}
                            className="w-32 h-32 object-contain"
                          />
                          <h3 className="text-xl font-semibold">
                            {item.productName}
                          </h3>
                        </td>
                        <td className="ps-6 py-3">
                          <div className="flex items-center gap-3">
                            <button className="text-xl size-7 flex justify-center items-center bg-gray-300">
                              -
                            </button>
                            {quantity}
                            <button className="text-xl size-7 flex justify-center items-center bg-gray-300">
                              +
                            </button>
                          </div>
                        </td>
                        <td className="ps-6 py-3 text-lg font-medium">
                          {item.price}
                        </td>
                        <td className="ps-6 py-3">
                          <button className="py-1 px-2 bg-red-500 text-white rounded">
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="w-full p-4 flex items-center justify-between">
                  <div className="text-2xl font-semibold">Total: 100</div>
                  <div>
                    <button className="py-1 px-2 bg-color1 text-white rounded">
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-60 flex flex-col items-center gap-3">
              <h2 className="text-2xl font-semibold">No Items In Wishlist</h2>
              <Link to="/" className="bg-green-600 text-white py-1 px-2">
                Add Now
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Wishlist;