import moment from "moment";
import TotalQuantitySoldBarChart from "../../../component/Chart/TotalQuantitySoldBarChart";
import TotalRevenuePieChart from "../../../component/Chart/TotalRevenuePieChart";

import React, { useState } from "react";
import { DatePicker } from "antd";
import RevenueChart from "../../../component/Chart/RevenueChart";

const { RangePicker } = DatePicker;

function PerformanceStaff() {
  const [dateRange, setDateRange] = useState([moment().startOf("year"), moment().endOf("year")]);

  const handleDateChange = (dates) => {
    if (dates && dates.length === 2) {
      setDateRange(dates);
    }
  };

  React.useEffect(() => {
    document.title = "Thống kê tổng quan";
  }, []);
  return (
    <div className="div2">
      <RangePicker format="YYYY-MM-DD" onChange={handleDateChange} style={{ marginBottom: "20px" }} />
      <TotalQuantitySoldBarChart
        startDate={dateRange[0].format("YYYY-MM-DD")}
        endDate={dateRange[1].format("YYYY-MM-DD")}
      />
      <TotalRevenuePieChart startDate={dateRange[0].format("YYYY-MM-DD")} endDate={dateRange[1].format("YYYY-MM-DD")} />
      <RevenueChart startDate={dateRange[0].format("YYYY-MM-DD")} endDate={dateRange[1].format("YYYY-MM-DD")} />
      
    </div>
  );
}

export default PerformanceStaff;
