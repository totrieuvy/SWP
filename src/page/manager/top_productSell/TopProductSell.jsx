import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import api from "../../../config/axios";
import { Spin } from "antd";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TopProductSell = () => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalUnits, setTotalUnits] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/api/Dashboard/top-selling-products-all")
      .then((response) => {
        const data = response.data;

        // Sort data by unitSold descending and select top 5
        const sortedData = data
          .sort((a, b) => b.unitSold - a.unitSold)
          .slice(0, 5);

        // Calculate total units and total revenue from top 5 products
        const totalUnitsTop5 = sortedData.reduce(
          (sum, item) => sum + item.unitSold,
          0
        );
        const totalRevenueTop5 = sortedData.reduce(
          (sum, item) => sum + item.revenueSold,
          0
        );

        const labels = sortedData.map((item) => item.product_Name);
        const unitSoldDataTop5 = sortedData.map((item) => item.unitSold);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: "Units Sold",
              data: unitSoldDataTop5,
              backgroundColor: "rgba(75, 192, 192, 0.6)",
            },
          ],
        });

        setTotalRevenue(totalRevenueTop5);
        setTotalUnits(totalUnitsTop5);
        setLoading(false);
        document.title = "Những sản phẩm bán chạy";
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setLoading(true);
      });
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Top 5 sản phẩm bán chạy nhất",
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
    // Adjust the height of the chart here
    height: 450, // Adjust this value as needed
  };

  return (
    <div className="top-product-sell-container">
      {loading ? (
        <Spin size="large" />
      ) : (
        <>
          <div className="top-product-sell-stats">
            <div>
              <h3>Total Revenue Sold</h3>
              <p>{totalRevenue.toLocaleString()} VND</p>
            </div>
            <div>
              <h3>Total Units Sold</h3>
              <p>{totalUnits}</p>
            </div>
          </div>
          <div className="bar-chart">
            <Bar data={chartData} options={options} />
          </div>
        </>
      )}
    </div>
  );
};

export default TopProductSell;
