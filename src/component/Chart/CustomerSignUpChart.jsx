import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Spin } from "antd";
import api from "../../config/axios";

const CustomerSignupChart = ({ startDate, endDate }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async (startDate, endDate) => {
    try {
      const response = await api.get(`/api/Dashboard/customer-signups?startTime=${startDate}&endTime=${endDate}`);
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

  const chartData = {
    labels: data.map((item) => item.staffName),
    datasets: [
      {
        label: "Số khách đã đăng kí",
        data: data.map((item) => item.numberSignUp),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)", // Red
          "rgba(54, 162, 235, 0.6)", // Blue
          "rgba(75, 192, 192, 0.6)", // Green (add more colors as needed)
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false, // Disable maintain aspect ratio
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      {loading ? (
        <Spin size="large" />
      ) : (
        <div className="CustomerSignupsChart">
          <Bar data={chartData} options={options} />
        </div>
      )}
    </>
  );
};

export default CustomerSignupChart;
