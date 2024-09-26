import React from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
} from "../../../ui/AnimatedModal";

const CategoryList = () => {
  return (
    <div className="p-6">
      <Modal>
        <ModalTrigger className="bg-black dark:bg-white dark:text-black text-white flex justify-center">
          <span className="text-center">Add Category</span>
        </ModalTrigger>
        <ModalBody>
          <ModalContent>
            <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
              Book your trip to{" "}
              <span className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
                Bali
              </span>{" "}
              now! ✈️
            </h4>
            <div className="flex justify-center items-center"></div>
            <div className="py-10 flex flex-wrap gap-x-4 gap-y-6 items-start justify-start max-w-sm mx-auto"></div>
          </ModalContent>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default CategoryList;
