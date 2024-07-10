import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import { Spin } from "antd"; // Import Spin component from Ant Design
Chart.register(ArcElement);
import "./style.css";
import api from "../../config/axios";

const sampleData = [
  { name: "Ring", totalAmountSold: 150 },
  { name: "Necklace", totalAmountSold: 200 },
  { name: "Bracelet", totalAmountSold: 100 },
  { name: "Anklet", totalAmountSold: 75 },
  { name: "Earring", totalAmountSold: 180 },
  { name: "Gold", totalAmountSold: 300 },
  { name: "Gemstone", totalAmountSold: 120 },
];

function generateColorArray(length) {
  let colorArray = [];

  // Generate pairs of complementary colors
  for (let i = 0; i < length; i += 2) {
    // Generate a random hue (0-360 degrees)
    let hue = Math.floor(Math.random() * 360);

    // First color in the pair
    let color1 = `hsl(${hue}, 100%, 50%)`;
    colorArray.push(color1);

    // Second color in the pair (complementary)
    let complementaryHue = (hue + 180) % 360;
    let color2 = `hsl(${complementaryHue}, 100%, 50%)`;
    colorArray.push(color2);
  }

  // If the length is odd, remove the last color
  if (length % 2 !== 0) {
    colorArray.pop();
  }

  return colorArray;
}

function CategoryTotalPieChart() {
  const [dataCategory, setData] = useState([]);
  const [isLoading, setLoading] = useState(true); // State for loading indicator

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("api/Dashboard/revenue-category-all");
        const apiData = response.data.map((item) => ({
          name: item.category_Name,
          totalAmountSold: item.category_Total,
        }));
        setData(apiData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading state to false after fetching data
      }
    };

    fetchData();
  }, []);

  const data = {
    labels: dataCategory.map((item) => item.name),
    datasets: [
      {
        data: dataCategory.map((item) => item.totalAmountSold),
        backgroundColor: generateColorArray(dataCategory.length),
        hoverBackgroundColor: generateColorArray(dataCategory.length),
      },
    ],
  };

  return (
    <div className="pieCategory">
      <h2>Biểu đồ tròn bán theo thể loại</h2>
      {isLoading ? (
        <Spin size="large" /> // Display Spin component while loading
      ) : (
        <Pie data={data} />
      )}
    </div>
  );
}

export default CategoryTotalPieChart;
