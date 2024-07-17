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
import CustomerSignupChart from "../../../component/Chart/CustomerSignUpChart";
import TopProductSell from "../../../page/manager/top_productSell/TopProductSell";
import TransactionTotal from "../../../page/manager/transaction/transaction-total/TransactionTotal";
import CustomerBuyTrend from "../../../component/Chart/CustomerBuyTrend";

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

  React.useEffect(() => {
    document.title = "Thống kê tổng quan";
  }, []);

  return (
    <>
      <RangePicker
        format="YYYY-MM-DD"
        onChange={handleDateChange}
        style={{ marginBottom: "20px" }}
      />
      <div className="adminAnalytic">
        <div className="div1">
          <CategoryTotalPieChart />

          <RevenueChart
            startDate={dateRange[0].format("YYYY-MM-DD")}
            endDate={dateRange[1].format("YYYY-MM-DD")}
          />
        </div>
        <div className="div2">
          <TotalQuantitySoldBarChart
            startDate={dateRange[0].format("YYYY-MM-DD")}
            endDate={dateRange[1].format("YYYY-MM-DD")}
          />
          <TotalRevenuePieChart
            startDate={dateRange[0].format("YYYY-MM-DD")}
            endDate={dateRange[1].format("YYYY-MM-DD")}
          />
        </div>
        <div className="div3">
          <CustomerSignupChart
            startDate={dateRange[0].format("YYYY-MM-DD")}
            endDate={dateRange[1].format("YYYY-MM-DD")}
          />
          <CustomerDemographicBarChart
            startDate={dateRange[0].format("YYYY-MM-DD")}
            endDate={dateRange[1].format("YYYY-MM-DD")}
          />
          <CustomerBuyTrend />
          <LoyaltyMemberBarChart
            startDate={dateRange[0].format("YYYY-MM-DD")}
            endDate={dateRange[1].format("YYYY-MM-DD")}
          />
        </div>
      </div>
      <div className="topProductSellContainer">
        <TopProductSell />
      </div>
      <TransactionTotal />
    </>
  );
}

export default Analytic;
