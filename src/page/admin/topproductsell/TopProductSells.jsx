import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import api from "../../../config/axios";
import { Spin } from "antd";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TopProductSells = () => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalUnits, setTotalUnits] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/api/Dashboard/top-selling-products-all")
      .then((response) => {
        document.title = "Những sản phẩm bán chạy";
        const data = response.data;

        const totalRevenue = data.reduce((sum, item) => sum + item.revenueSold, 0);
        const totalUnits = data.reduce((sum, item) => sum + item.unitSold, 0);

        const sortedData = data.sort((a, b) => b.unitSold - a.unitSold).slice(0, 10);

        const labels = sortedData.map((item) => item.product_Name);
        const unitSoldData = sortedData.map((item) => item.unitSold);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: "Units Sold",
              data: unitSoldData,
              backgroundColor: "rgba(75, 192, 192, 0.6)",
            },
          ],
        });

        setTotalRevenue(totalRevenue);
        setTotalUnits(totalUnits);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setLoading(true);
      });
  }, []);

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Top 10 sản phẩm bán chạy nhất",
      },
    },
    scales: {
      y: {
        ticks: {
          stepSize: 1,
          callback: function (value) {
            return Number.isInteger(value) ? value : null;
          },
        },
      },
    },
  };

  return (
    <div className="top-product-sell-container">
      {loading ? (
        <Spin size="large" />
      ) : (
        <>
          <div className="top-product-sell-stats">
            <div>
              <h3>Tổng doanh thu</h3>
              <p>{totalRevenue.toLocaleString()} VND</p>
            </div>
            <div>
              <h3>Tổng số lượng</h3>
              <p>{totalUnits}</p>
            </div>
          </div>
          <div className="bar-chart" style={{ width: "1100px", height: "600px" }}>
            <Bar data={chartData} options={options} />
          </div>
        </>
      )}
    </div>
  );
};

export default TopProductSells;
