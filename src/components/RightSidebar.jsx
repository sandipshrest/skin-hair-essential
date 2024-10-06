import React, { useEffect } from "react";
import ProfileSidebar from "../ui/AnimatedSidebar";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/reducerSlice/UserSlice";
import toast from "react-hot-toast";
import { MdLogout } from "react-icons/md";
import { Link } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";
import { FaRegHeart, FaRegUser } from "react-icons/fa6";

const RightSidebar = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const wishlistItems = useSelector((state) => state.wishlist);

  const handleLogout = () => {
    dispatch(logoutUser());
    setOpen(false);
    toast.success("Logout");
  };

  useEffect(() => {
    if (open) {
      return document.body.classList.add("overflow-hidden");
    }
    document.body.classList.remove("overflow-hidden");
  }, [open]);

  return (
    <ProfileSidebar open={open} setOpen={setOpen}>
      <div className="flex h-full w-full flex-col justify-between items-start">
        <div className="w-full px-4">
          <ul className="flex flex-col items-start gap-4 font-medium">
            <li className="w-full">
              <Link
                onClick={() => setOpen(false)}
                to="/"
                className="flex w-full items-center gap-3 py-1"
              >
                <FaRegUser size={20} />
                Profile
              </Link>
            </li>
            <li className="w-full">
              <Link
                onClick={() => setOpen(false)}
                to="/cart"
                className="flex w-full items-center gap-3 py-1 relative"
              >
                <BsCart3 size={20} />
                Cart
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -left-2 size-4 bg-red-600 text-xs text-white rounded-full flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </Link>
            </li>
            <li className="w-full">
              <Link
                onClick={() => setOpen(false)}
                to="/wishlist"
                className="flex w-full items-center gap-3 py-1 relative"
              >
                <FaRegHeart size={20} />
                Watchlist
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-1 -left-2 size-4 bg-red-600 text-xs text-white rounded-full flex items-center justify-center">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </div>
        <div className="w-full pt-3 px-4 border-t border-gray-400">
          <button
            onClick={handleLogout}
            className="bg-red-700 text-white py-1 text-center w-full font-medium flex items-center gap-2 justify-center"
          >
            <MdLogout size={20} />
            Logout
          </button>
        </div>
      </div>
    </ProfileSidebar>
  );
};

export default RightSidebar;
