import React from "react";
import FeatureData from "../../data/FeatureData";

const Feature = () => {
  return (
    <section className="relative pt-28 bg-color3 bg-opacity-10">
      <div className="container absolute z-10 -bottom-16 left-1/2 -translate-x-1/2 w-2/3 bg-white border border-gray-400 rounded-lg py-8 grid grid-cols-3">
        {FeatureData?.map((item, id) => (
          <div key={id} className="flex items-center gap-5">
            <div className="rounded-full bg-green-200 size-12 flex items-center justify-center">
              <i className={`${item.icon} text-xl text-gray-900`}></i>
            </div>
            <h2 className="text-xl font-semibold text-center uppercase">
              {item.title}
            </h2>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Feature;
