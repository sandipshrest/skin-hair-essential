import React, { useCallback, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Select, Switch } from "antd";
import { useDropzone } from "react-dropzone";

const ProductSchema = Yup.object().shape({
  productName: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  category: Yup.string().required("Required"),
  importedCompany: Yup.string().required("Required"),
  price: Yup.number().required("Required"),
  discount: Yup.number().required("Required"),
});

const AddProduct = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const onDrop = useCallback((acceptedFiles) => {
    if (Array.isArray(acceptedFiles)) {
      acceptedFiles?.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setSelectedImages((prevImages) => {
            return [...prevImages, e.target.result];
          });
        };
        reader.readAsDataURL(file);
      });
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="py-6 px-8 shadow-md bg-white rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-color3">Add Product</h2>
      <Formik
        initialValues={{
          productName: "",
          description: "",
          images: [],
          isFeatured: false,
          category: "",
          importedCompany: "",
          price: "",
          discount: "",
        }}
        validationSchema={ProductSchema}
        onSubmit={(values) => console.log(values)}
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
                  options={[
                    { value: "jack", label: "Jack" },
                    { value: "lucy", label: "Lucy" },
                    { value: "Yiminghe", label: "yiminghe" },
                  ]}
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
                  onChange={(e) =>
                    setFieldValue("isFeatured", e.target.checked)
                  }
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
              <Editor
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
              </div>
              <div className="w-1/2">
                {selectedImages?.map((image, id) => (
                  <img key={id} src={image} alt="image" />
                ))}
              </div>
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
