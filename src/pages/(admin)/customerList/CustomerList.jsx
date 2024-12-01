import React, { useState, useEffect } from "react";
import api from "../../../api/axios";
import { Table } from "antd";
import moment from "moment";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);

  const fetchCustomers = async () => {
    const response = await api.get("/user/all");
    setCustomers(response.data.users);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // define column to display the customer list on the table
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
      title: "Customer Name",
      dataIndex: "name",
      key: "name",
      render: (name) => {
        return <p className="text-base font-medium">{name}</p>;
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (email) => {
        return (
          <div>
            <p className="text-base font-medium">{email}</p>
          </div>
        );
      },
    },
    {
      title: "Contact",
      dataIndex: "contact",
      key: "contact",
      render: (contact) => {
        return <p className="text-base font-medium">{contact}</p>;
      },
    },
    {
      title: "Registered At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => {
        return <p className="text-base font-medium">{moment(createdAt).format("LL")}</p>;
      },
    },
  ];

  return (
    <div className="w-full space-y-4 py-6 px-8 shadow-md bg-white rounded-lg">
      <h3 className="text-2xl font-semibold">Customer List</h3>
      <Table
        dataSource={customers}
        key="userId"
        columns={columns}
        pagination={false}
      />
    </div>
  );
};

export default CustomerList;
