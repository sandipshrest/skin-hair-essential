import React from "react";
import FeatureData from "../../data/FeatureData";

const Feature = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container grid grid-cols-3">
        {FeatureData?.map((item, id) => (
          <div key={id} className="flex flex-col items-center gap-5">
            <i className={`${item.icon} text-3xl text-gray-900`}></i>
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
