import React from "react";
import ProductList from "./_components/ProductList";
import OrderList from "./_components/OrderList";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 md:col-span-6 lg:col-span-5">
        <OrderList />
      </div>
      <div className="col-span-12 md:col-span-6 lg:col-span-7">
        <ProductList />
      </div>
    </div>
  );
};

export default Dashboard;
