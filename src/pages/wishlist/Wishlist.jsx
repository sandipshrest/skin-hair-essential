import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../../redux/reducerSlice/CartSlice";
import { removeFromWishlist } from "../../redux/reducerSlice/WishlistSlice";

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist);
  const cartItems = useSelector((state) => state.cart);

  const isItemInCart = (item) => {
    return cartItems?.some((cartItem) => cartItem.id === item.id);
  };

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
                      <th className="text-start ps-4 py-2">Price</th>
                      <th className="text-start ps-4 py-2">Cart</th>
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
                        <td className="ps-6 py-3 text-lg font-medium">
                          {item.price}
                        </td>
                        <td className="ps-6 py-3">
                          <button
                            disabled={isItemInCart(item)}
                            onClick={() => dispatch(addToCart(item))}
                            className={`py-1 px-2 text-white ${
                              isItemInCart(item)
                                ? "bg-green-500"
                                : "bg-green-700"
                            }`}
                          >
                            Add To Cart
                          </button>
                        </td>
                        <td className="ps-6 py-3">
                          <button
                            onClick={() => dispatch(removeFromWishlist(item))}
                            className="py-1 px-2 bg-red-500 text-white"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
