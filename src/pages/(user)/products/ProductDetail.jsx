import React, { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import ProductData from "../../../data/ProductData";
import ProductItem from "../../../components/ProductItem";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist } from "../../../redux/reducerSlice/WishlistSlice";
import { addToCart } from "../../../redux/reducerSlice/CartSlice";
import ReactImageMagnify from "@blacklab/react-image-magnify";
import api from "../../../api/axios";
import moment from "moment/moment";
import { FaLock, FaRegStar, FaStar } from "react-icons/fa";
import { Modal, Tooltip } from "antd";
import toast from "react-hot-toast";
import { HiDotsVertical } from "react-icons/hi";
import calculateDiscountedPrice from "../../../lib/calculatePrice";

const ProductDetail = () => {
  const navigate = useNavigate();
  const { isLogin, token, user } = useSelector((state) => state.user);
  const { productName } = useParams();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [productDetail, setProductDetail] = useState({});
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [feedbackList, setFeedbackList] = useState([]);
  const [isHovered, setIsHovered] = useState(null);
  const [rating, setRating] = useState(null);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const wishlistItems = useSelector((state) => state.wishlist);
  const [openPopup, setOpenPopup] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [editMessage, setEditMessage] = useState(null);
  const [editRating, setEditRating] = useState("");

  // fetch product detail
  const fetchProductDetail = async () => {
    try {
      const response = await api.get(`/product/${id}`);
      if (response.status === 200) {
        setProductDetail(response.data.product);
      } else {
        toast.error("Failed to fetch product detail");
      }
    } catch (err) {
      console.error(err);
    }
  };

  //fetch feedback
  const fetchFeedback = async () => {
    try {
      const response = await api.get(`/feedback/product/${id}`);
      if (response.status === 200) {
        setFeedbackList(response.data.allFeedback);
      } else {
        toast.error("Failed to fetch feedbacks");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProductDetail();
    fetchFeedback();
  }, [id]);

  // fetch product by category
  const fetchProductByCategory = async () => {
    try {
      const response = await api.get(
        `/product/category?category=${productDetail?.category?.category}`
      );
      if (response.status === 200) {
        setCategoryProduct(response.data.productList);
      } else {
        toast.error("Failed to fetch products");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProductByCategory();
  }, [productDetail]);

  const similarProducts = categoryProduct?.filter(
    (item) => item.productName !== productName
  );

  const isItemInCart = (item) => {
    return cartItems?.some((cartItem) => cartItem.id === item?._id);
  };

  const isItemInWishlist = (item) => {
    return wishlistItems?.some((wishlistItem) => wishlistItem.id === item?._id);
  };


  // ratings
  const ratings = [
    { rating: 1, feedback: "Very Bad" },
    { rating: 2, feedback: "Bad" },
    { rating: 3, feedback: "Average" },
    { rating: 4, feedback: "Good" },
    { rating: 5, feedback: "Excellent" },
  ];

  // feedback message to display
  const feedbackMessageToDisplay = (rating) => {
    return ratings.find((item) => item.rating === rating).feedback;
  };

  // function to submit feedback
  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(
        "/feedback",
        {
          rating,
          feedback: message,
          product: id,
        },
        {
          headers: { Authorization: `Bearer ${token?.accessToken}` },
        }
      );
      if (response.status === 200) {
        fetchFeedback();
        setRating(null);
        setMessage("");
        toast.success(response?.data?.msg);
      } else {
        toast.error(response?.data?.msg);
      }
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  // function to delete feedback
  const handleDeleteFeedback = async (feedbackId) => {
    try {
      const response = await api.delete(`/feedback/${feedbackId}`);
      if (response.status === 200) {
        fetchFeedback();
        toast.success(response.data.msg);
      } else {
        toast.error(response.data.msg);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // function to update feedback
  const handleUpdateFeedback = async (e) => {
    e.preventDefault();
    try {
      const response = await api.patch("/feedback", {
        rating: editRating,
        feedback: editMessage,
        id: feedbackByCurrentUser._id,
      });
      if (response.status === 200) {
        fetchFeedback();
        setEditRating(null);
        setEditMessage("");
        setOpenModal(false);
        toast.success(response?.data?.msg);
      } else {
        toast.error(response?.data?.msg);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const feedbackByCurrentUser = feedbackList?.find(
    (feedback) => feedback.postedBy._id === user._id
  );

  useEffect(() => {
    setEditMessage(feedbackByCurrentUser?.feedback);
    setEditRating(feedbackByCurrentUser?.rating);
  }, [feedbackByCurrentUser]);

  return (
    <>
      <section className="pt-32 pb-6 bg-green-700 bg-opacity-15">
        <div className="container">
          <ul className="flex items-center text-lg gap-2 font-medium">
            <li>
              <Link to="/" className="text-color3">
                {" "}
                Home{" "}
              </Link>
            </li>
            /
            <li>
              <Link
                to={`/categories/${productDetail?.category?.category}`}
                className="text-color3"
              >
                {productDetail?.category?.category}
              </Link>
            </li>
            /<li>{productName}</li>
          </ul>
        </div>
      </section>
      <section className="py-24 bg-gray-100">
        {productDetail && (
          <div className="container flex gap-14">
            <div className="w-1/3 px-6">
              <div className="w-full sticky top-28">
                <ReactImageMagnify
                  imageProps={{
                    alt: productName,
                    height: 450,
                    src: productDetail.productImages?.[0],
                    className:
                      "h-[450px] object-contain bg-color3 bg-opacity-20",
                  }}
                  magnifiedImageProps={{
                    height: 800,
                    src: productDetail.productImages?.[0],
                    width: 800,
                    className: "object-contain bg-white",
                  }}
                  magnifyContainerProps={{
                    width: 450,
                    height: 450,
                    style: {
                      position: "absolute",
                      top: "-230px",
                    },
                  }}
                  onActivationChanged={function noRefCheck() {}}
                  onDetectedEnvironmentChanged={function noRefCheck() {}}
                  onPositionChanged={function noRefCheck() {}}
                  portalProps={{
                    horizontalOffset: 10,
                    id: "portal-test-id",
                  }}
                />
              </div>
            </div>
            <div className="w-2/3 flex flex-col gap-12">
              <div className="flex flex-col gap-2">
                <small className="text-base font-medium text-gray-700">
                  {productDetail?.category?.category}
                </small>
                <h2 className="text-4xl font-semibold">
                  {productDetail.productName}
                </h2>
                <p>{productDetail.description}</p>
                <p className="text-lg font-semibold">
                  Imported From: {productDetail.importedCompany}
                </p>
                {productDetail.rating > 0 && (
                  <div className="flex items-center gap-3">
                    <p className="flex items-center gap-1 py-0.5 px-1.5 text-sm font-semibold bg-green-700 text-white rounded">
                      {productDetail.rating}
                      <FaStar size={12} />
                    </p>
                    <p className="text-base font-bold text-gray-600">
                      {productDetail.totalReview} Reviews
                    </p>
                  </div>
                )}
                <b className="text-xl font-bold">
                  {productDetail.discount > 0 ? (
                    <div className="flex items-center gap-3">
                      <p className="text-black">
                        Rs.
                        {calculateDiscountedPrice(
                          productDetail.price,
                          productDetail.discount
                        )}
                      </p>
                      <span className="line-through text-gray-700 font-medium text-base">
                        Rs.{productDetail.price}
                      </span>
                      <span className="text-green-700 font-medium text-base">
                        {productDetail.discount}% off
                      </span>
                    </div>
                  ) : (
                    <span>Rs.{productDetail.price}</span>
                  )}
                </b>
                <div className="flex items-center gap-3 mt-3 text-lg">
                  <button
                    disabled={!isLogin || isItemInCart(productDetail)}
                    onClick={() => dispatch(addToCart(productDetail?._id))}
                    className={`py-1 px-2 text-white transition-all duration-200 ease-linear ${
                      isItemInCart(productDetail)
                        ? "bg-green-500"
                        : "bg-green-700"
                    }`}
                  >
                    Add To Cart
                  </button>
                  <button
                    disabled={!isLogin || isItemInWishlist(productDetail)}
                    onClick={() => dispatch(addToWishlist(productDetail?._id))}
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
              <div className="bg-white w-full p-5 shadow-md space-y-4 relative">
                <h3 className="text-xl font-semibold">Post Feedback</h3>
                <form
                  onSubmit={handleSubmitFeedback}
                  className={`w-1/2 space-y-3 ${
                    !isLogin && "filter blur-[3px] opacity-40"
                  }`}
                >
                  <div className="flex items-center">
                    {ratings.map((item, id) => {
                      if (
                        (item.rating !== null && item.rating <= isHovered) ||
                        item.rating <= rating
                      ) {
                        return (
                          <Tooltip
                            title={item.feedback}
                            key={item.rating}
                            className="px-1"
                          >
                            <FaStar
                              key={id}
                              size={30}
                              className="cursor-pointer text-green-700"
                              onMouseEnter={() => setIsHovered(item.rating)}
                              onMouseLeave={() => setIsHovered(null)}
                              onClick={() => setRating(item.rating)}
                            />
                          </Tooltip>
                        );
                      } else {
                        return (
                          <Tooltip
                            title={item.feedback}
                            key={item.rating}
                            className="px-1"
                          >
                            <FaRegStar
                              key={id}
                              size={30}
                              className="cursor-pointer"
                              onMouseEnter={() => setIsHovered(item.rating)}
                              onMouseLeave={() => setIsHovered(null)}
                              onClick={() => alert("Hello wrold")}
                            />
                          </Tooltip>
                        );
                      }
                    })}
                  </div>
                  <textarea
                    rows="6"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write something..."
                    className="border border-gray-500 p-1 rounded focus:outline-none w-full"
                  ></textarea>
                  <button
                    type="submit"
                    disabled={!rating || !message}
                    className="py-1 px-2 bg-green-700 font-medium border border-green-700 text-white"
                  >
                    Submit
                  </button>
                </form>
                {!isLogin && (
                  <div className="absolute w-full h-[260px] left-0 bottom-3.5 flex items-center justify-center">
                    <button
                      onClick={() => navigate("/login")}
                      className="bg-black flex items-center gap-1.5 rounded-lg text-white font-medium py-1 px-2"
                    >
                      Log in <FaLock />
                    </button>
                  </div>
                )}
              </div>
              {feedbackList.length > 0 && (
                <div className="bg-white w-full py-5 shadow-md space-y-4">
                  <h3 className="text-xl font-semibold px-5">All feedbacks</h3>
                  <div>
                    {feedbackByCurrentUser && (
                      <div className="px-5 py-3 border-y border-gray-300 flex items-start justify-between gap-4">
                        <div className="space-y-2.5">
                          <div className="flex items-start gap-2.5">
                            <p className="flex items-center gap-1 py-0.5 px-1.5 text-sm font-semibold bg-green-700 text-white rounded">
                              {feedbackByCurrentUser.rating}
                              <FaStar size={12} />
                            </p>
                            <p className="text-xl font-bold">
                              {feedbackMessageToDisplay(
                                feedbackByCurrentUser.rating
                              )}
                            </p>
                          </div>
                          <p className="font-medium">
                            {feedbackByCurrentUser.feedback}
                          </p>
                          <div className="flex text-sm font-semibold text-gray-600 items-center gap-2">
                            <p>{feedbackByCurrentUser.postedBy.name}</p>
                            <p>
                              {moment(feedbackByCurrentUser.updatedAt).format(
                                "LL"
                              )}
                            </p>
                          </div>
                        </div>
                        <div className="relative">
                          <button onClick={() => setOpenPopup(!openPopup)}>
                            <HiDotsVertical size={24} />
                          </button>
                          {openPopup && (
                            <div className="absolute top-0 right-5 bg-gray-100 rounded-md p-2 shadow-lg">
                              <button
                                onClick={() => {
                                  setOpenModal(true);
                                  setOpenPopup(false);
                                }}
                                className="text-blue-700 font-semibold pb-2 border-b border-gray-300 px-6 w-full"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => {
                                  handleDeleteFeedback(
                                    feedbackByCurrentUser._id
                                  );
                                  setOpenPopup(false);
                                }}
                                className="text-red-700 font-semibold px-6 pt-2 w-full"
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    {feedbackList
                      ?.filter((feedback) => feedback.postedBy._id !== user._id)
                      ?.map((feedback, id) => (
                        <div
                          key={id}
                          className="px-5 py-3 border-y border-gray-300 space-y-2.5"
                        >
                          <div className="flex items-start gap-2.5">
                            <p className="flex items-center gap-1 py-0.5 px-1.5 text-sm font-semibold bg-green-700 text-white rounded">
                              {feedback.rating}
                              <FaStar size={12} />
                            </p>
                            <p className="text-xl font-bold">
                              {feedbackMessageToDisplay(feedback.rating)}
                            </p>
                          </div>
                          <p className="font-medium">{feedback.feedback}</p>
                          <div className="flex text-sm font-semibold text-gray-600 items-center gap-2">
                            <p>{feedback.postedBy.name}</p>
                            <p>{moment(feedback.updatedAt).format("LL")}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
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
      {openModal && (
        <Modal
          open={openModal}
          onCancel={() => setOpenModal(false)}
          onOk={() => setOpenModal(false)}
          title="Edit Feedback"
          footer={null}
        >
          <form onSubmit={handleUpdateFeedback} className={`space-y-3 p-2`}>
            <div className="flex items-center">
              {ratings.map((item, id) => {
                if (
                  (item.rating !== null && item.rating <= isHovered) ||
                  item.rating <= editRating
                ) {
                  return (
                    <Tooltip
                      title={item.feedback}
                      key={item.rating}
                      className="px-1"
                    >
                      <FaStar
                        key={id}
                        size={30}
                        className="cursor-pointer text-green-700"
                        onMouseEnter={() => setIsHovered(item.rating)}
                        onMouseLeave={() => setIsHovered(null)}
                        onClick={() => setEditRating(item.rating)}
                      />
                    </Tooltip>
                  );
                } else {
                  return (
                    <Tooltip
                      title={item.feedback}
                      key={item.rating}
                      className="px-1"
                    >
                      <FaRegStar
                        key={id}
                        size={30}
                        className="cursor-pointer"
                        onMouseEnter={() => setIsHovered(item.rating)}
                        onMouseLeave={() => setIsHovered(null)}
                        onClick={() => alert("Hello wrold")}
                      />
                    </Tooltip>
                  );
                }
              })}
            </div>
            <textarea
              rows="6"
              value={editMessage}
              onChange={(e) => setEditMessage(e.target.value)}
              placeholder="Write something..."
              className="border border-gray-500 p-1 rounded focus:outline-none w-full"
            ></textarea>
            <button
              type="submit"
              disabled={!editRating || !editMessage}
              className="py-1 px-2 bg-green-700 font-medium border border-green-700 text-white"
            >
              Submit
            </button>
          </form>
        </Modal>
      )}
    </>
  );
};

export default ProductDetail;
