import { Pagination, Table } from "antd";
import React, { useEffect, useState } from "react";
import api from "../../../../api/axios";
import toast from "react-hot-toast";
import moment from "moment";

const ProductList = () => {
  const [productList, setProductList] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const pageSize = 5;

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

  // define column to display the product list on the table
  const columns = [
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
              className="size-16 rounded-full object-contain"
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
    // {
    //   title: "Is Featured",
    //   dataIndex: "isFeatured",
    //   key: "isFeatured",
    //   render: (isFeatured, record) => {
    //     return (
    //       <div>
    //         <Switch
    //           className="bg-gray-300"
    //           defaultChecked={isFeatured}
    //           onChange={(checked) => {
    //             handleSwitch(record._id, checked);
    //           }}
    //         />
    //       </div>
    //     );
    //   },
    // },
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
    // {
    //   title: "Created At",
    //   dataIndex: "createdAt",
    //   key: "createdAt",
    //   render: (createdAt) => {
    //     return (
    //       <p className="text-base font-medium">
    //         {moment(createdAt).format("LL")}
    //       </p>
    //     );
    //   },
    // },
  ];

  return (
    <div className="flex flex-col items-end gap-6 py-6 px-8 shadow-md bg-white rounded-lg">
      <div className="w-full space-y-4">
        <h3 className="text-2xl font-semibold">Product Overview</h3>
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
