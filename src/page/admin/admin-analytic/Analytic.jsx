import React, { useState } from "react";
import moment from "moment";
import "./style.css";
import CategoryTotalPieChart from "../../../component/Chart/CategoryTotalPieChart";
import CustomerDemographicBarChart from "../../../component/Chart/CustomerDemographicBarChart";
import TotalQuantitySoldBarChart from "../../../component/Chart/TotalQuantitySoldBarChart";
import TotalRevenuePieChart from "../../../component/Chart/TotalRevenuePieChart";
import LoyaltyMemberBarChart from "../../../component/Chart/LoyaltyMemberBarChart";
import RevenueChart from "../../../component/Chart/RevenueChart";
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;

function Analytic() {
  const [dateRange, setDateRange] = useState([
    moment().startOf("year"),
    moment().endOf("year"),
  ]);

  const handleDateChange = (dates) => {
    if (dates && dates.length === 2) {
      setDateRange(dates);
    }
  };

  return (
    <>
      <RangePicker
        format="YYYY-MM-DD"
        onChange={handleDateChange}
        style={{ marginBottom: "20px" }}
      />
      <div className="adminAnalytic">
        <CategoryTotalPieChart />
        <CustomerDemographicBarChart
          startDate={dateRange[0].format("YYYY-MM-DD")}
          endDate={dateRange[1].format("YYYY-MM-DD")}
        />
        <TotalQuantitySoldBarChart
          startDate={dateRange[0].format("YYYY-MM-DD")}
          endDate={dateRange[1].format("YYYY-MM-DD")}
        />
        <TotalRevenuePieChart
          startDate={dateRange[0].format("YYYY-MM-DD")}
          endDate={dateRange[1].format("YYYY-MM-DD")}
        />
        <LoyaltyMemberBarChart
          startDate={dateRange[0].format("YYYY-MM-DD")}
          endDate={dateRange[1].format("YYYY-MM-DD")}
        />
        <RevenueChart />
      </div>
    </>
  );
}

export default Analytic;
