import React, { useEffect, useState } from "react";
import { Pagination, Table } from "antd";
import api from "../../../api/axios";
import { MdDelete } from "react-icons/md";
import moment from "moment";
import toast from "react-hot-toast";

const FeedbackList = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [openPopup, setOpenPopup] = useState(null);

  // function to fetch feedback list
  const fetchFeedback = async () => {
    try {
      const response = await api.get(`/feedback?page=${page}`);
      if (response.status === 200) {
        setFeedbackList(response.data.feedbackList);
        setTotal(response.data.totalFeedback);
      } else {
        toast.error(response.data.msg);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, [page]);

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

  // define column to display the feedback list on the table
  const columns = [
    {
      title: "S.N.",
      dataIndex: "",
      key: "",
      render: (text, record, index) => {
        return <span>{index + 1}</span>;
      },
    },
    {
      title: "Feedback",
      dataIndex: "feedback",
      key: "feedback",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rating) => {
        return <span>{rating}</span>;
      },
    },
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
      render: (product) => {
        return <span>{product?.productName}</span>;
      },
    },
    {
      title: "Posted By",
      dataIndex: "postedBy",
      key: "postedBy",
      render: (postedBy) => {
        return <span>{postedBy.name}</span>;
      },
    },
    {
      title: "Posted At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (updatedAt) => {
        return <span>{moment(updatedAt).format("LL")}</span>;
      },
    },
    {
      title: "Actions",
      render: (text, record, index) => {
        return (
          <div className="flex items-center gap-4">
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
                  You want to delete this feedback?
                  <div className="flex items-center justify-center gap-2 mt-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteFeedback(record._id);
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
      <h3 className="text-2xl font-semibold">Feedback List</h3>
      <Table dataSource={feedbackList} columns={columns} pagination={false} />
      <Pagination
        defaultCurrent={page}
        onChange={(page) => setPage(page)}
        total={total}
      />
    </div>
  );
};

export default FeedbackList;
