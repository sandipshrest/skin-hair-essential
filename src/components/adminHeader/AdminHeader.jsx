import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import api from "../../api/axios";
import toast from "react-hot-toast";
import { logoutUser } from "../../redux/reducerSlice/UserSlice";

const AdminHeader = () => {
  const { token, user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //function to logout user
  const handleLogout = async () => {
    try {
      const response = await api.delete("/auth/logout", {
        headers: {
          Authorization: `Bearer ${token?.accessToken}`,
        },
      });
      if (response.status === 200) {
        navigate("/");
        dispatch(logoutUser());
        toast.success(response.data.msg);
      } else {
        toast.error("Failed to logout!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className="py-4 bg-gray-200 w-full">
      <div className="container flex w-full items-center justify-between">
        <Link to="/dashboard">
          <img src="/images/logo.png" alt="logo" className="size-16" />
        </Link>
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="bg-green-700 text-white size-8 text-2xl font-medium rounded-full flex items-center justify-center">
              {user?.name[0]}
            </div>
            <div className="flex flex-col items-start">
              <p className="text-lg font-medium">{user?.name}</p>
              <small>{user?.role}</small>
            </div>
          </div>
          <button
            onClick={() => handleLogout()}
            className="text-lg font-medium"
          >
            Log out
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
