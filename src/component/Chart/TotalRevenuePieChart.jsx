import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { Spin, DatePicker } from "antd";
import moment from "moment";
import api from "../../config/axios";

Chart.register(...registerables);

const { RangePicker } = DatePicker;

const TotalRevenuePieChart = ({ startDate, endDate }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async (startDate, endDate) => {
    try {
      const response = await api.get(
        `/api/Dashboard/revenueByStaff?startDate=${startDate}&endDate=${endDate}`
      );
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(startDate, endDate);
    console.log(startDate, endDate);
  }, [startDate, endDate]);

  const handleDateChange = (dates) => {
    if (dates) {
      setLoading(true);
      // Dates are already moment objects from RangePicker
      startDate = dates[0];
      endDate = dates[1];
    }
  };

  const chartData = {
    labels: data.map((item) => item.staffName),
    datasets: [
      {
        label: "Total Revenue",
        data: data.map((item) => item.totalRevenue),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)", // Red
          "rgba(54, 162, 235, 0.6)", // Blue
          "rgba(75, 192, 192, 0.6)", // Green
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      {loading ? (
        <Spin size="large" />
      ) : (
        <div className="TotalRevenuePieChart">
          <Pie data={chartData} options={{ aspectRatio: 0 }} />
        </div>
      )}
    </div>
  );
};

export default TotalRevenuePieChart;
