import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../api/axios";
import toast from "react-hot-toast";
import { Pagination, Switch, Table } from "antd";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import moment from "moment";

const ProductList = () => {
  const [productList, setProductList] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [openPopup, setOpenPopup] = useState(null);
  // const [pageSize, setPageSize] = useState(10);
  const pageSize = 10;

  // function to fetch product list
  const fetchProduct = async () => {
    try {
      const response = await api.get(
        `/product?page=${page}&pageSize=${pageSize}`
      );
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

  // function to fetch product list
  const deleteProduct = async (productId) => {
    try {
      const response = await api.delete(`/product/${productId}`);
      if (response.status === 200) {
        toast.success(response.data.msg);
        fetchProduct();
      } else {
        toast.error(response.data.msg);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSwitch = async (productId, isFeatured) => {
    try {
      const response = await api.patch(`/product/featured/${productId}`, {
        isFeatured,
      });
      if (response.status === 200) {
        toast.success(response.data.msg);
        fetchProduct();
      } else {
        toast.error(response.data.msg);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // define column to display the product list on the table
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
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
      render: (productName, record) => {
        return (
          <div className="flex items-center gap-2">
            <img
              src={record.productImages[0]}
              alt="product"
              className="size-20 rounded-full object-contain"
            />
            <p className="text-base font-medium">{productName}</p>
          </div>
        );
      },
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category) => {
        return <p className="text-base font-medium">{category.category}</p>;
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => {
        return <p className="text-base font-medium">Rs.{price}</p>;
      },
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      render: (discount) => {
        return <p className="text-base font-medium">{discount}%</p>;
      },
    },
    {
      title: "Is Featured",
      dataIndex: "isFeatured",
      key: "isFeatured",
      render: (isFeatured, record) => {
        return (
          <div>
            <Switch
              className="bg-gray-300"
              defaultChecked={isFeatured}
              onChange={(checked) => {
                handleSwitch(record._id, checked);
              }}
            />
          </div>
        );
      },
    },
    {
      title: "Imported From",
      dataIndex: "importedCompany",
      key: "importedCompany",
      render: (importedCompany) => {
        return <p className="text-base font-medium">{importedCompany}</p>;
      },
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rating) => {
        return <p className="text-base font-medium">{rating}</p>;
      },
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => {
        return (
          <p className="text-base font-medium">
            {moment(createdAt).format("LL")}
          </p>
        );
      },
    },
    {
      title: "Actions",
      render: (text, record, index) => {
        return (
          <div className="flex items-center gap-4">
            <button>
              <FaRegEdit size={20} />
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
              <MdDelete size={20} />
              {openPopup === index && (
                <div className="absolute bottom-5 right-2 shadow-md w-[250px] bg-gray-50 text-black p-2 rounded">
                  You want to delete this product?
                  <div className="flex items-center justify-center gap-2 mt-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteProduct(record._id);
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
          pageSize={pageSize}
          total={total}
        />
      </div>
    </div>
  );
};

export default ProductList;
