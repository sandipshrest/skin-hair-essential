import React, { useCallback, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
} from "../../../ui/AnimatedModal";
import { useDropzone } from "react-dropzone";
import { FaXmark } from "react-icons/fa6";
import toast from "react-hot-toast";
import api from "../../../api/axios";
import { Table } from "antd";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import moment from "moment";

const Banner = () => {
  const [open, setOpen] = useState(false);
  const [openPopup, setOpenPopup] = useState(null);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [bannerList, setBannerList] = useState([]);
  const [selectedImageToUpload, setSelectedImageToUpload] = useState(null);
  const inputRef = useRef(null);

  // handle image drop
  const onDrop = useCallback((acceptedFiles) => {
    if (Array.isArray(acceptedFiles)) {
      setSelectedImage(null);
      setSelectedImageToUpload(acceptedFiles);
      acceptedFiles?.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setSelectedImage(e.target.result);
        };
        reader.readAsDataURL(file);
        setImageUploaded(true);
      });
    }
  }, []);

  // handle add banner
  const handleAddBanner = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", inputRef.current.value);
      for (let file of selectedImageToUpload) {
        formData.append("bannerImage", file);
      }
      const response = await api.post("/banner", formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        toast.success(response.data.msg);
        fetchBannerList();
        setOpen(false);
      } else {
        toast.error(response.data.msg);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  // handle delete banner
  const deleteBanner = async (bannerId) => {
    try {
      const response = await api.delete(`/banner/${bannerId}`);
      if (response.status === 200) {
        toast.success(response.data.msg);
        fetchBannerList();
      } else {
        toast.error(response.data.msg);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // handle fetch banner list
  const fetchBannerList = async () => {
    try {
      const response = await api.get("/banner");
      if (response.status === 200) {
        setBannerList(response.data.banners);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBannerList();
  }, []);

  // define column to display the banner list on the table
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
      title: "Banner Title",
      dataIndex: "title",
      key: "title",
      render: (title) => {
        return <p className="text-base font-medium">{title}</p>;
      },
    },
    {
      title: "Image",
      dataIndex: "bannerImage",
      key: "bannerImage",
      render: (bannerImage) => {
        return (
          <img src={bannerImage} className="w-20 h-20" alt="banner image" />
        );
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
                  You want to delete this banner?
                  <div className="flex items-center justify-center gap-2 mt-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteBanner(record._id);
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
      <Modal open={open} setOpen={setOpen}>
        <ModalTrigger className="bg-black dark:bg-white dark:text-black text-white flex justify-center">
          <span className="text-center">Add Banner</span>
        </ModalTrigger>
        <ModalBody>
          <ModalContent>
            <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
              Add Banner
            </h4>
            <div className="px-8">
              <form
                className="flex flex-col items-center gap-5"
                onSubmit={handleAddBanner}
              >
                <div className="flex flex-col items-start gap-1 w-full relative">
                  <label htmlFor="title">Title</label>
                  <input
                    ref={inputRef}
                    type="text"
                    name="title"
                    id="title"
                    className="border border-gray-300 focus:outline-none w-full py-1 px-2"
                  />
                </div>
                <div className="flex items-center gap-8 w-full">
                  <div className="flex flex-col items-start gap-2 w-2/3">
                    <label htmlFor="image">Banner Image</label>
                    <div
                      {...getRootProps()}
                      className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-500 border-dashed rounded-lg cursor-pointer hover:bg-gray-50"
                    >
                      <input
                        {...getInputProps()}
                        id="dropzone-file"
                        className="hidden"
                        accept=".jpeg,.jpg,.png,.webp"
                      />
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-8 h-8 mb-4 text-gray-500"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        {isDragActive ? (
                          <p className="mb-2 text-sm text-gray-500">
                            Drop the files here ...
                          </p>
                        ) : (
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop your images
                          </p>
                        )}
                        <p className="text-xs text-gray-500">
                          We only accept PNG, JPG & WEBP
                        </p>
                      </div>
                    </div>
                    {/* <span className="text-red-700">{errorMessage}</span> */}
                  </div>
                  {imageUploaded && (
                    <div className="w-1/3 h-auto relative">
                      <img
                        src={selectedImage}
                        className="h-[150px] w-full object-cover"
                        alt="image"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedImage(null);
                          setSelectedImageToUpload(null);
                          setImageUploaded(false);
                        }}
                        className="absolute top-0 right-0 size-5 flex justify-center items-center bg-white rounded-full text-red-700"
                      >
                        <FaXmark size={16} />
                      </button>
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={!imageUploaded || !inputRef.current.value}
                  className="py-1 px-2 bg-color1 text-white font-medium"
                >
                  Add Banner
                </button>
              </form>
            </div>
          </ModalContent>
        </ModalBody>
      </Modal>
      <div className="w-full space-y-4">
        <h3 className="text-2xl font-semibold">Banner List</h3>
        <Table dataSource={bannerList} columns={columns} pagination={false} />
      </div>
    </div>
  );
};

export default Banner;
