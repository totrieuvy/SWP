import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from "chart.js";
import api from "../../config/axios";
import { Spin } from "antd";

// Register the required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
);

const RevenueChart = ({ startDate, endDate }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchData = async (startDate, endDate) => {
    try {
      const response = await api.get(
        `/api/Dashboard/daily-revenue?startDate=${startDate}&endDate=${endDate}`
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

  const daysArray = [];
  const start = new Date(startDate);
  const end = new Date(endDate);

  for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
    daysArray.push(new Date(d).toISOString().split("T")[0]);
  }

  const chartData = {
    labels: daysArray,
    datasets: [
      {
        label: "Daily Revenue",
        data: daysArray.map((date) => data[date] || 0),
        fill: false,
        borderColor: "#00144F",
        tension: 0.1,
      },
    ],
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Days",
        },
        ticks: {
          callback: function (value, index) {
            const date = new Date(daysArray[value]);
            return `${months[date.getMonth()]}`;
          },
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Revenue",
        },
      },
    },
  };

  return (
    <>
      {loading ? (
        <Spin size="large" />
      ) : (
        <div className="DailyRevenueOverTime">
          <Line data={chartData} options={options} />
        </div>
      )}
    </>
  );
};

export default RevenueChart;
