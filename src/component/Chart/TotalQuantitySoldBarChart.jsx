import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { Spin, DatePicker } from "antd";
import moment from "moment";
import api from "../../config/axios";

Chart.register(...registerables);

const { RangePicker } = DatePicker;

const TotalQuantitySoldBarChart = ({ startDate, endDate }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async (startDate, endDate) => {
    try {
      const response = await api.get(
        `/api/Dashboard/salesByStaff?startDate=${startDate}&endDate=${endDate}`
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
    labels: data.map((item) => item.staffUsername),
    datasets: [
      {
        label: "Total Quantity Sold",
        data: data.map((item) => item.totalQuantitySold),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      {loading ? (
        <Spin size="large" />
      ) : (
        <div className="TotalQuantitySoldBarChart">
          <Bar data={chartData} options={options} />
        </div>
      )}
    </div>
  );
};

export default TotalQuantitySoldBarChart;
