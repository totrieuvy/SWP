import CustomerDemographicBarChart from "../../../component/Chart/CustomerDemographicBarChart";
import CategoryTotalPieChart from "../../../component/Chart/CategoryTotalPieChart";
import RevenueChart from "../../../component/Chart/RevenueChart";
import React from "react";

function Analytic() {
  return (
    <div>
      <CategoryTotalPieChart />
      <CustomerDemographicBarChart />
      <RevenueChart />
    </div>
  );
}

export default Analytic;
