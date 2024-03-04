import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  removeFromCart,
  updateCartItemQuantity,
} from "../../redux/reducerSlice/CartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  const handleQuantityChange = (item, change) => {
    dispatch(updateCartItemQuantity({ itemId: item.id, change }));
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <>
      <section className="py-10 bg-gray-100"></section>
      <section className="py-28 bg-gray-100">
        <div className="container">
          {cartItems.length > 0 ? (
            <div className="space-y-8">
              <h2 className="text-3xl font-semibold">Your Cart</h2>
              <div className="bg-white">
                <div className="h-[550px] overflow-y-auto">
                  <table className="w-full">
                    <thead className="border-b-2 sticky bg-white shadow top-0">
                      <tr className="text-lg">
                        <th className="text-start ps-4 py-2">Product</th>
                        <th className="text-start ps-4 py-2">Quantity</th>
                        <th className="text-start ps-4 py-2">Price</th>
                        <th className="text-start ps-4 py-2">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((cartItem, cartId) => (
                        <tr key={cartId} className="border-b">
                          <td className="flex flex-col ps-4 py-3">
                            <img
                              src={cartItem.image}
                              alt={cartItem.productName}
                              className="w-32 h-32 object-contain"
                            />
                            <h3 className="text-xl font-semibold">
                              {cartItem.productName}
                            </h3>
                          </td>
                          <td className="ps-6 py-3">
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() =>
                                  handleQuantityChange(cartItem, -1)
                                }
                                className="text-xl size-7 flex justify-center items-center bg-gray-300"
                              >
                                -
                              </button>
                              <p className="w-6 text-center">
                                {cartItem.quantity}
                              </p>
                              <button
                                onClick={() =>
                                  handleQuantityChange(cartItem, 1)
                                }
                                className="text-xl size-7 flex justify-center items-center bg-gray-300"
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="ps-6 py-3 text-lg font-medium">
                            <p className="w-20">
                              {cartItem.price * cartItem.quantity}
                            </p>
                          </td>
                          <td className="ps-6 py-3">
                            <button
                              onClick={() => dispatch(removeFromCart(cartItem))}
                              className="py-1 px-2 bg-red-500 text-white rounded"
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="w-full border-t-2 p-4 flex items-center justify-between">
                  <div className="text-2xl font-semibold">
                    Total: {totalPrice}
                  </div>
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
              <h2 className="text-2xl font-semibold">No Items In Cart</h2>
              <Link to="/" className="bg-green-600 text-white py-1 px-2">
                Shop Now
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Cart;
