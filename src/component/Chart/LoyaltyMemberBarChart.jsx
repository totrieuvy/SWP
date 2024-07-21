import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { Spin, DatePicker } from "antd";
import moment from "moment";
import api from "../../config/axios";

Chart.register(...registerables);

const LoyaltyMemberBarChart = ({ startDate, endDate }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/api/Dashboard/loyalty-customers`, {
          params: {
            startTime: startDate,
            endTime: endDate,
          },
        });
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [startDate, endDate]);

  const handleDateChange = (dates) => {
    if (dates) {
      startDate = moment(dates[0]).format("YYYY-MM-DD");
      endDate = moment(dates[1]).format("YYYY-MM-DD");
      // Optionally, trigger a new data fetch here if needed
    }
  };

  const chartData = {
    labels: ["Connect", "Member", "Companion", "Intimate"],
    datasets: [
      {
        label: "Loại khách hàng",
        data: [data[0]?.connect || 0, data[0]?.member || 0, data[0]?.companion || 0, data[0]?.intimate || 0],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)", // Red
          "rgba(54, 162, 235, 0.6)", // Blue
          "rgba(75, 192, 192, 0.6)", // Green
          "rgba(255, 205, 86, 0.6)", // Yellow
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(255, 205, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return loading ? (
    <Spin size="large" />
  ) : (
    <div className="LoyaltyMember" style={{ height: "400px" }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default LoyaltyMemberBarChart;
