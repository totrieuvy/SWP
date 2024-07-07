import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import api from "../../config/axios";
import { Spin, DatePicker } from "antd";
import moment from "moment";

Chart.register(...registerables);

const { RangePicker } = DatePicker;

const CustomerDemographicBarChart = ({ startDate, endDate }) => {
  const [demographicData, setDemographicData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDemographic = async () => {
      try {
        const response = await api.get(`api/Dashboard/demographic-customers?startTime=${startDate}&endTime=${endDate}`);
        const rawData = response.data;
        setDemographicData([rawData[0]?.male || 0, rawData[0]?.female || 0, rawData[0]?.other || 0]);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchDemographic();
  }, [startDate, endDate]);

  const data = {
    labels: ["Male", "Female", "Others"],
    datasets: [
      {
        label: "Giới tính",
        data: demographicData,
        backgroundColor: [
          "rgba(54, 162, 235, 0.6)", // Blue color for Male
          "rgba(255, 99, 132, 0.6)", // Red color for Female
          "rgba(75, 192, 192, 0.6)", // Green color for Others
        ],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)", "rgba(75, 192, 192, 1)"],
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

  const handleDateChange = (dates) => {
    if (dates) {
      startDate = moment(dates[0]);
      endDate = moment(dates[1]);
    }
  };

  return (
    <div className="CustomerDemographic">{loading ? <Spin size="large" /> : <Bar data={data} options={options} />}</div>
  );
};

export default CustomerDemographicBarChart;
