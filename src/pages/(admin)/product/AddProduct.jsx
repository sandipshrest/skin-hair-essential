import React, { useCallback, useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Select, Switch } from "antd";
import { useDropzone } from "react-dropzone";
import api from "../../../api/axios";
import toast from "react-hot-toast";
import { FaXmark } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const ProductSchema = Yup.object().shape({
  productName: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  category: Yup.string().required("Required"),
  importedCompany: Yup.string().required("Required"),
  price: Yup.number().required("Required"),
  discount: Yup.number().required("Required"),
});

const AddProduct = () => {
  const navigate = useNavigate();

  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedImageToUpload, setSelectedImageToUpload] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // handle image drop
  const onDrop = useCallback((acceptedFiles) => {
    if (Array.isArray(acceptedFiles)) {
      setSelectedImages([]);
      setSelectedImageToUpload(acceptedFiles);
      acceptedFiles?.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setSelectedImages((prevImages) => {
            return [...prevImages, e.target.result];
          });
        };
        reader.readAsDataURL(file);
        setImageUploaded(true);
      });
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  // fetch all category
  const fetchCategory = async () => {
    try {
      const response = await api.get("/category");
      if (response.status === 200) {
        setCategoryList(response.data.allCategory);
      } else {
        toast.error(response.data.msg);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const options = categoryList?.map((category) => ({
    value: category._id,
    label: category.category,
  }));

  // function to clear all images
  const handleClearImage = (e) => {
    e.stopPropagation();
    setSelectedImages([]);
    setSelectedImageToUpload([]);
    setImageUploaded(false);
  };

  // function to delete clicked image
  const handleDeleteImage = (imageId) => {
    setSelectedImages(selectedImages?.filter((image, id) => id !== imageId));
    setSelectedImageToUpload(
      selectedImageToUpload?.filter((image, id) => id !== imageId)
    );
    selectedImages?.length === 1 && setImageUploaded(false);
  };

  // function to add product
  const handleAddProduct = async (values) => {
    try {
      if (selectedImageToUpload?.length === 0) {
        return setErrorMessage("Please upload images!");
      }
      const formData = new FormData();
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      for (let item in values) {
        formData.append(item, values[item]);
      }
      for (let file of selectedImageToUpload) {
        formData.append("productImages", file);
      }

      const response = await api.post("/product", formData, config);
      if (response.status === 200) {
        toast.success(response.data.msg);
        navigate("/dashboard/productList");
      } else {
        toast.error(response.data.msg);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="py-6 px-8 shadow-md bg-white rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-color3">Add Product</h2>
      <Formik
        initialValues={{
          productName: "",
          description: "",
          isFeatured: false,
          category: "",
          importedCompany: "",
          price: "",
          discount: 0,
        }}
        validationSchema={ProductSchema}
        onSubmit={(values) => handleAddProduct(values)}
      >
        {({ setFieldValue, values }) => (
          <Form className="px-3 py-5 flex flex-col gap-8 items-center">
            <div className="flex items-center gap-6 w-full">
              <div className="flex flex-col items-start gap-2 w-1/3">
                <label>Product Name</label>
                <Field
                  type="text"
                  name="productName"
                  placeholder="productName"
                  className="border border-gray-400 focus:outline-none px-2 py-1 w-full"
                />
                <ErrorMessage
                  className="text-red-600"
                  name="productName"
                  component="div"
                />
              </div>
              <div className="flex flex-col items-start gap-2 w-1/3">
                <label>Select Category</label>
                <Select
                  style={{ width: "100%" }}
                  onChange={(value) => {
                    setFieldValue("category", value);
                  }}
                  placeholder="Select Category"
                  options={options}
                />
                <ErrorMessage
                  className="text-red-600"
                  name="category"
                  component="div"
                />
              </div>
              <div className="flex flex-col items-start gap-2 w-1/3">
                <label>Is Featured Product</label>
                <Switch
                  onChange={(checked) => {
                    setFieldValue("isFeatured", checked);
                  }}
                />
              </div>
            </div>
            <div className="flex items-center gap-6 w-full">
              <div className="flex flex-col items-start gap-2 w-1/3">
                <label htmlFor="importedCompany">Imported From</label>
                <Field
                  type="text"
                  name="importedCompany"
                  placeholder="Imported From"
                  className="border border-gray-400 focus:outline-none px-2 py-1 w-full"
                />
                <ErrorMessage
                  className="text-red-600"
                  name="importedCompany"
                  component="div"
                />
              </div>
              <div className="flex flex-col items-start gap-2 w-1/3">
                <label htmlFor="price">Price</label>
                <Field
                  type="number"
                  name="price"
                  placeholder="Price"
                  className="border border-gray-400 focus:outline-none px-2 py-1 w-full"
                />
                <ErrorMessage
                  className="text-red-600"
                  name="price"
                  component="div"
                />
              </div>
              <div className="flex flex-col items-start gap-2 w-1/3">
                <label htmlFor="discount">Discount</label>
                <Field
                  type="number"
                  name="discount"
                  placeholder="Discount"
                  className="border border-gray-400 focus:outline-none px-2 py-1 w-full"
                />
                <ErrorMessage
                  className="text-red-600"
                  name="discount"
                  component="div"
                />
              </div>
            </div>
            <div className="flex flex-col items-start gap-2 w-full">
              <label htmlFor="description">Product Description</label>
              {/* <Editor
                apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
                init={{
                  height: 300,
                  width: "100%",
                  menubar: false,
                  plugins: [
                    "advlist autolink lists link image charmap print preview anchor",
                    "searchreplace visualblocks code fullscreen",
                    "insertdatetime media table paste code help wordcount",
                  ],
                  toolbar:
                    "undo redo | formatselect | bold italic backcolor | \
                alignleft aligncenter alignright alignjustify | \
                bullist numlist outdent indent | removeformat | help",
                }}
                onEditorChange={(content) =>
                  setFieldValue("description", content)
                }
              /> */}
              <Field
                type="text"
                as="textarea"
                name="description"
                placeholder="Description"
                className="border border-gray-400 focus:outline-none px-2 py-1 w-full"
              />
              <ErrorMessage
                className="text-red-600"
                name="description"
                component="div"
              />
            </div>
            <div className="flex items-center gap-8 w-full">
              <div className="flex flex-col items-start gap-2 w-1/2">
                <label htmlFor="image">Product Images</label>
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
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop your images
                      </p>
                    )}
                    <p className="text-xs text-gray-500">
                      We only accept PNG, JPG & WEBP
                    </p>
                  </div>
                </div>
                <span className="text-red-700">{errorMessage}</span>
              </div>
              {imageUploaded && (
                <div className="w-1/2 flex flex-col items-end gap-2">
                  <button
                    type="button"
                    onClick={handleClearImage}
                    className="bg-red-700 text-white py-1 px-2"
                  >
                    Clear All
                  </button>
                  <div
                    className="w-full grid lg:grid-cols-3 gap-3 max-h-[350px] overflow-y-auto"
                    style={{ scrollbarWidth: "thin" }}
                  >
                    {selectedImages?.map((image, id) => (
                      <div key={id} className="w-full h-auto relative">
                        <img
                          src={image}
                          className="h-[200px] w-full object-cover"
                          alt="image"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteImage(id);
                          }}
                          className="absolute top-0 right-0 size-5 flex justify-center items-center bg-white rounded-full text-red-700"
                        >
                          <FaXmark size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button
              type="submit"
              className="bg-green-700 text-white py-1 px-2 font-medium text-lg"
            >
              Add Product
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddProduct;
