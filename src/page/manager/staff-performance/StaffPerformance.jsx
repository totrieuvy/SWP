import React, { useState } from "react";
import "./style.css";
import CustomerSignupChart from "../../../component/Chart/CustomerSignUpChart";
import moment from "moment";
import TotalQuantitySoldBarChart from "../../../component/Chart/TotalQuantitySoldBarChart";
import TotalRevenuePieChart from "../../../component/Chart/TotalRevenuePieChart";
import ManagerStaff from "./component/ManagerStaff";

function StaffPerformance() {
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
    <div className="staffPerformanceDashboardDivider">
      <section className="left">
        <ManagerStaff />
      </section>
      <section className="right">
        <CustomerSignupChart
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
      </section>
    </div>
  );
}

export default StaffPerformance;
