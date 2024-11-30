import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  removeFromCart,
  updateCartItemQuantity,
} from "../../../redux/reducerSlice/CartSlice";
import api from "../../../api/axios";
import toast from "react-hot-toast";
import calculateDiscountedPrice from "../../../lib/calculatePrice";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const { token } = useSelector((state) => state.user);
  const [productList, setProductList] = useState([]);

  const handleQuantityChange = (item, change) => {
    dispatch(updateCartItemQuantity({ itemId: item.id, change }));
  };

  // function to fetch product list
  const fetchProduct = async () => {
    try {
      const response = await api.get(`/product`);
      if (response.status === 200) {
        setProductList(response.data.productList);
      } else {
        toast.error(response.data.msg);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const productInCart = cartItems.map((cartItem) => ({
    ...productList.find((product) => product._id === cartItem.id),
    quantity: cartItem.quantity,
  }));

  const totalPrice = productInCart.reduce(
    (total, item) =>
      total +
      calculateDiscountedPrice(item.price, item.discount) * item.quantity,
    0
  );

  // function to proceed to checkout
  const proceedToCheckout = async () => {
    try {
      const data = productInCart.map((item) => ({
        orderedProduct: item._id,
        quantity: item.quantity,
      }));
      const response = await api.post(
        "/order",
        { orders: data },
        {
          headers: { Authorization: `Bearer ${token?.accessToken}` },
        }
      );
      if (response.status === 200) {
        toast.success(response.data.msg);
      } else {
        toast.error(response.data.msg);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <section className="pt-32 pb-6 bg-green-700 bg-opacity-15">
        <div className="container">
          <ul className="flex items-center text-lg gap-2 font-medium">
            <li>
              <Link to="/" className="text-color3">
                Home
              </Link>
            </li>
            /<li>Cart</li>
          </ul>
        </div>
      </section>
      <section className="py-24 bg-gray-100">
        <div className="container">
          {productInCart?.length > 0 ? (
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
                      {productInCart?.map((cartItem, cartId) => (
                        <tr key={cartId} className="border-b">
                          <td className="flex flex-col ps-4 py-3">
                            <img
                              src={cartItem?.productImages?.[0]}
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
                                  handleQuantityChange({ id: cartItem._id }, -1)
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
                                  handleQuantityChange({ id: cartItem._id }, 1)
                                }
                                className="text-xl size-7 flex justify-center items-center bg-gray-300"
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="ps-6 py-3 text-lg font-medium">
                            <p className="w-20">
                              {calculateDiscountedPrice(
                                cartItem.price,
                                cartItem.discount
                              ) * cartItem.quantity}
                            </p>
                          </td>
                          <td className="ps-6 py-3">
                            <button
                              onClick={() =>
                                dispatch(removeFromCart({ id: cartItem._id }))
                              }
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
                    <button
                      onClick={proceedToCheckout}
                      className="py-1 px-2 bg-color1 text-white rounded"
                    >
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
