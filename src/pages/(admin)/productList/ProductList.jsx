import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../api/axios";
import toast from "react-hot-toast";
import { Pagination, Table } from "antd";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const ProductList = () => {
  const [productList, setProductList] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  // function to fetch product list
  const fetchProduct = async () => {
    try {
      const response = await api.get(`/product?page=${page}`);
      if (response.status === 200) {
        setProductList(response.data.productList);
        setTotal(response.data.totalProduct);
      } else {
        toast.error(response.data.msg);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [page]);

  // define column to display the product list on the table
  const columns = [
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category) => {
        return <span>{category.category}</span>;
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => {
        return <span>Rs.{price}</span>;
      },
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      render: (discount) => {
        return <span>{discount}%</span>;
      },
    },
    {
      title: "Is Featured",
      dataIndex: "isFeatured",
      key: "isFeatured",
      render: (isFeatured) => {
        return <span>{isFeatured ? "Yes" : "No"}</span>;
      },
    },
    {
      title: "Imported From",
      dataIndex: "importedCompany",
      key: "importedCompany",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Actions",
      render: (text, record) => (
        <div className="flex items-center gap-4">
          <button>
            <FaRegEdit size={20} />
          </button>
          <button className="text-red-600">
            <MdDelete size={20} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col items-end gap-6 py-6 px-8 shadow-md bg-white rounded-lg">
      <Link
        to="/dashboard/product"
        className="inline-block py-1 px-2 bg-black text-white font-medium"
      >
        Add Product
      </Link>
      <div className="w-full space-y-4">
        <h3 className="text-2xl font-semibold">Product List</h3>
        <Table dataSource={productList} columns={columns} pagination={false} />
        <Pagination
          defaultCurrent={page}
          onChange={(page) => setPage(page)}
          total={total}
        />
      </div>
    </div>
  );
};

export default ProductList;
