import React, { useEffect, useState } from "react";
import api from "../../../api/axios";
import { Select, Table, Tooltip } from "antd";
import { MdDelete } from "react-icons/md";
import moment from "moment";
import toast from "react-hot-toast";
import { getOrderStatusColor } from "../../../lib/getOrderStatusColor";
import { FaRegEdit } from "react-icons/fa";
const OrderList = () => {
  const [orderList, setOrderList] = useState([]);
  const [openPopup, setOpenPopup] = useState(null);
  const [openEditPopup, setOpenEditPopup] = useState(null);

  const statusOptions = ["HOLD", "PROCESSING", "COMPLETED", "CANCELLED"];

  // function to get order list
  const getOrderList = async () => {
    try {
      const response = await api.get("/order");
      if (response.status === 200) {
        setOrderList(response.data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getOrderList();
  }, []);

  // function to delete order
  const handleDeleteOrder = async (orderId) => {
    try {
      const response = await api.delete(`/order/${orderId}`);
      if (response.status === 200) {
        getOrderList();
        toast.success(response.data.msg);
      } else {
        toast.error(response.data.msg);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // function to update order status
  const handleUpdateOrderStatus = async (orderId, status) => {
    try {
      const response = await api.patch(`/order`, {
        orderId,
        orderStatus: status,
      });
      if (response.status === 200) {
        getOrderList();
        toast.success(response.data.msg);
      } else {
        toast.error(response.data.msg);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // define column to display the order list on the table
  const columns = [
    {
      title: "S.N.",
      dataIndex: "",
      key: "",
      render: (text, record, index) => {
        return <p className="text-base font-medium">{index + 1}</p>;
      },
    },
    {
      title: "Order Id",
      dataIndex: "orderId",
      key: "orderId",
      render: (orderId) => {
        return <p className="text-base font-medium">{orderId}</p>;
      },
    },
    {
      title: "Customer",
      dataIndex: "orderedBy",
      key: "orderedBy",
      render: (orderedBy) => {
        return (
          <div>
            <p className="text-base font-medium">{orderedBy?.name}</p>
            <small className="font-medium">{orderedBy?.email}</small>
          </div>
        );
      },
    },
    {
      title: "Product",
      dataIndex: "orderedProduct",
      key: "orderedProduct",
      render: (orderedProduct) => {
        return (
          <p className="text-base font-medium">{orderedProduct?.productName}</p>
        );
      },
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity) => {
        return <p className="text-base font-medium">{quantity}</p>;
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => {
        return <p className="text-base font-medium">{price}</p>;
      },
    },
    {
      title: "Status",
      dataIndex: "orderStatus",
      key: "orderStatus",
      render: (orderStatus) => {
        return (
          <div className="flex items-center justify-start">
            <p
              className={`py-1 px-2 text-base font-medium ${getOrderStatusColor(
                orderStatus
              )}`}
            >
              {orderStatus}
            </p>
          </div>
        );
      },
    },
    {
      title: "Ordered At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (updatedAt) => {
        return (
          <p className="text-base font-medium">
            {moment(updatedAt).format("LL")}
          </p>
        );
      },
    },
    {
      title: "Actions",
      render: (text, record, index) => {
        return (
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                if (openEditPopup === index) {
                  setOpenEditPopup(null);
                  return;
                }
                setOpenEditPopup(index);
              }}
              className="relative"
            >
              <Tooltip title="Update Order Status">
                <FaRegEdit size={20} />
              </Tooltip>
              {openEditPopup === index && (
                <div className="absolute bottom-5 right-2 shadow-md w-[250px] bg-gray-50 text-black p-2 rounded">
                  <p>Update Order Status</p>
                  <Select
                    defaultValue={record.orderStatus}
                    onChange={(value) => {
                      handleUpdateOrderStatus(record.orderId, value);
                      setOpenEditPopup(null);
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    options={statusOptions.map((status) => ({
                      label: status,
                      value: status,
                    }))}
                  />
                </div>
              )}
            </button>
            <button
              onClick={() => {
                if (openPopup === index) {
                  setOpenPopup(null);
                  return;
                }
                setOpenPopup(index);
              }}
              className="text-red-600 relative"
            >
              <Tooltip title="Delete Order">
                <MdDelete size={20} />
              </Tooltip>
              {openPopup === index && (
                <div className="absolute bottom-5 right-2 shadow-md w-[250px] bg-gray-50 text-black p-2 rounded">
                  You want to delete this Order?
                  <div className="flex items-center justify-center gap-2 mt-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteOrder(record._id);
                        setOpenPopup(null);
                      }}
                      className="bg-red-700 text-white py-0.5 px-2 text-sm font-medium"
                    >
                      Yes
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenPopup(null);
                      }}
                      className="bg-green-700 text-white py-0.5 px-2 text-sm font-medium"
                    >
                      No
                    </button>
                  </div>
                </div>
              )}
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="w-full space-y-4 py-6 px-8 shadow-md bg-white rounded-lg">
      <h3 className="text-2xl font-semibold">Order List</h3>
      <Table
        dataSource={orderList}
        key="orderId"
        columns={columns}
        pagination={false}
      />
    </div>
  );
};

export default OrderList;
