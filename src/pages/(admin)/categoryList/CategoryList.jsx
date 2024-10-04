import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
} from "../../../ui/AnimatedModal";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import api from "../../../api/axios";
import moment from "moment";
import { MdDelete } from "react-icons/md";

const CategorySchema = Yup.object().shape({
  category: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

const CategoryList = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [open, setOpen] = useState(false);
  const [openPopup, setOpenPopup] = useState(null);

  // add category
  const handleAddCategory = async (values) => {
    try {
      const response = await api.post("/category", values);
      if (response.status === 200) {
        toast.success(response.data.msg);
        setOpen(false);
        fetchCategory();
      } else {
        toast.error(response.data.msg);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // add category
  const handleDeleteCategory = async (categoryId) => {
    try {
      const response = await api.delete(`/category/${categoryId}`);
      if (response.status === 200) {
        toast.success(response.data.msg);
        setCategoryList((prevCategoryList) =>
          prevCategoryList.filter((category) => category._id !== categoryId)
        );
        setOpenPopup(null);
      } else {
        toast.error("Failed to delete category!");
      }
    } catch (err) {
      console.error(err);
    }
  };

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

  return (
    <div className="w-full flex flex-col items-end gap-4 shadow-md bg-white rounded-lg px-5 py-6">
      {/* animated modal to add category */}
      <Modal open={open} setOpen={setOpen}>
        <ModalTrigger className="bg-black dark:bg-white dark:text-black text-white flex justify-center">
          <span className="text-center">Add Category</span>
        </ModalTrigger>
        <ModalBody>
          <ModalContent>
            <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
              Add Product Category
            </h4>
            <div className="px-8">
              <Formik
                initialValues={{
                  category: "",
                }}
                validationSchema={CategorySchema}
                onSubmit={(values) => {
                  // same shape as initial values
                  handleAddCategory(values);
                }}
              >
                {({ errors, touched }) => (
                  <Form className="flex flex-col items-center gap-5">
                    <div className="flex flex-col items-start gap-1 w-full relative">
                      <label htmlFor="category">Category</label>
                      <Field
                        type="text"
                        name="category"
                        id="category"
                        className="border border-gray-300 focus:outline-none w-full py-1 px-2"
                      />
                      {errors.category && touched.category ? (
                        <div className="absolute text-sm text-red-600 -bottom-5 left-0">
                          {errors.category}
                        </div>
                      ) : null}
                    </div>
                    <button
                      type="submit"
                      className="py-1 px-2 bg-color1 text-white font-medium"
                    >
                      Add Category
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </ModalContent>
        </ModalBody>
      </Modal>
      <div className="w-full space-y-4">
        <h2 className="text-2xl font-semibold text-color3">Category List</h2>
        <table className="w-full">
          <thead>
            <tr>
              <th className="border border-gray-500">S.N.</th>
              <th className="border border-gray-500">Category Name</th>
              <th className="border border-gray-500">Created At</th>
              <th className="border border-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categoryList?.length > 0 ? (
              categoryList?.map((category, id) => (
                <tr key={id}>
                  <td className="text-center border border-gray-500">
                    {id + 1}
                  </td>
                  <td className="text-center border border-gray-500">
                    {category.category}
                  </td>
                  <td className="text-center border border-gray-500">
                    {moment(category.createdAt).format("LL")}
                  </td>
                  <td className="text-center border border-gray-500">
                    <div className="relative inline-block">
                      <MdDelete
                        onClick={() =>
                          setOpenPopup(openPopup !== id ? id : null)
                        }
                        className="text-red-700 cursor-pointer"
                        size={20}
                      />
                      {openPopup === id && (
                        <div className="absolute min-w-[250px] max-w-[300px] bottom-5 border border-gray-400 rounded-md right-0 py-1.5 px-2 bg-gray-50">
                          Do you want to delete {category.category}?
                          <div className="space-x-3 mt-1">
                            <button
                              onClick={() => handleDeleteCategory(category._id)}
                              className="bg-red-600 text-white px-2 text-sm"
                            >
                              Yes
                            </button>
                            <button
                              onClick={() => setOpenPopup(null)}
                              className="bg-color1 text-white px-2 text-sm"
                            >
                              No
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="border border-gray-500">
                <td colSpan="4" className="text-center py-1 font-medium">
                  No category found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryList;
