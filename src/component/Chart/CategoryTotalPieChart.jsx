import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
Chart.register(ArcElement);
import "./style.css";
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
  const data = {
    labels: sampleData.map((item) => item.name),
    datasets: [
      {
        data: sampleData.map((item) => item.totalAmountSold),
        backgroundColor: generateColorArray(sampleData.length),
        hoverBackgroundColor: generateColorArray(sampleData.length),
      },
    ],
  };

  return (
    <div className="pieCategory">
      <h2>Sales by Category</h2>
      <Pie data={data} />
    </div>
  );
}

export default CategoryTotalPieChart;
