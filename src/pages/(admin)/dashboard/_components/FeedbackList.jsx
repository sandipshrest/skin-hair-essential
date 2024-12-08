import { Table } from "antd";
import React, { useEffect, useState } from "react";
import api from "../../../../api/axios";
import toast from "react-hot-toast";
import moment from "moment";

const FeedbackList = () => {
  const [feedbackList, setFeedbackList] = useState([]);

  const fetchFeedbackList = async () => {
    try {
      const response = await api.get("/feedback/recent");
      if (response.status === 200) {
        setFeedbackList(response.data.feedbackList);
      } else {
        toast.error(response.data.msg);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFeedbackList();
  }, []);

  // define column to display the feedback list on the table
  const columns = [
    {
      title: "Feedback",
      dataIndex: "feedback",
      key: "feedback",
      render: (feedback) => {
        return <p className="text-base font-medium">{feedback}</p>;
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
      title: "Product",
      dataIndex: "product",
      key: "product",
      render: (product) => {
        return <p className="text-base font-medium">{product?.productName}</p>;
      },
    },
    {
      title: "Posted By",
      dataIndex: "postedBy",
      key: "postedBy",
      render: (postedBy) => {
        return <p className="text-base font-medium">{postedBy.name}</p>;
      },
    },
    {
      title: "Posted At",
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
  ];

  return (
    <div className="flex flex-col items-end gap-6 py-6 px-8 shadow-md bg-white rounded-lg">
      <div className="w-full space-y-4">
        <h3 className="text-2xl font-semibold">Recent Feedbacks</h3>
        <Table
          dataSource={feedbackList}
          columns={columns}
          pagination={{ pageSize: 5 }}
        />
      </div>
    </div>
  );
};

export default FeedbackList;
