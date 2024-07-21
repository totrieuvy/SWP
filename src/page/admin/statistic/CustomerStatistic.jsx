import React, { useState } from "react";
import moment from "moment";
import { DatePicker } from "antd";
import CustomerDemographicBarChart from "../../../component/Chart/CustomerDemographicBarChart";
import LoyaltyMemberBarChart from "../../../component/Chart/LoyaltyMemberBarChart";

import CustomerSignupChart from "../../../component/Chart/CustomerSignUpChart";

const { RangePicker } = DatePicker;

function CustomerStatistic() {
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
    <>
      <RangePicker format="YYYY-MM-DD" onChange={handleDateChange} style={{ marginBottom: "20px" }} />
      <div className="div3">
        <CustomerSignupChart
          startDate={dateRange[0].format("YYYY-MM-DD")}
          endDate={dateRange[1].format("YYYY-MM-DD")}
        />
        <CustomerDemographicBarChart
          startDate={dateRange[0].format("YYYY-MM-DD")}
          endDate={dateRange[1].format("YYYY-MM-DD")}
        />

        <LoyaltyMemberBarChart
          startDate={dateRange[0].format("YYYY-MM-DD")}
          endDate={dateRange[1].format("YYYY-MM-DD")}
        />
      </div>
    </>
  );
}

export default CustomerStatistic;
