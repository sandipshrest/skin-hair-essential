import { Table } from "antd";
import React, { useEffect, useState } from "react";
import api from "../../../../api/axios";
import moment from "moment";

const OrderList = () => {
  const [orderList, setOrderList] = useState([]);

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

  // define column to display the order list on the table
  const columns = [
    {
      title: "Order Id",
      dataIndex: "orderId",
      key: "orderId",
      render: (orderId) => {
        return <p className="text-base font-medium">{orderId}</p>;
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
  ];

  return (
    <div className="flex flex-col items-end gap-6 py-6 px-8 shadow-md bg-white rounded-lg">
      <div className="w-full space-y-4">
        <h3 className="text-2xl font-semibold">Orders</h3>
        <Table
          dataSource={orderList}
          key="orderId"
          columns={columns}
          pagination={false}
        />
      </div>
    </div>
  );
};

export default OrderList;
