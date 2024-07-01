import React from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from "chart.js";

// Register the required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
);

const generateDailyData = (year) => {
  const dailyData = [];

  // Loop through each month (1 to 12)
  for (let month = 1; month <= 12; month++) {
    const daysInMonth = new Date(year, month, 0).getDate(); // Get number of days in the month

    // Loop through each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${year}-${month.toString().padStart(2, "0")}-${day
        .toString()
        .padStart(2, "0")}`;
      // Generate random revenue data (for demonstration purposes)
      const revenue = Math.floor(Math.random() * 100) + 100; // Example random revenue between 100 and 199

      // Push each day's data into the dailyData array
      dailyData.push({ date: dateString, revenue: revenue });
    }
  }

  return dailyData;
};

function RevenueChart() {
  const dataPoints = generateDailyData(2024); // Generate the data points
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
  // Create arrays for labels and data points
  const labels = dataPoints.map((dataPoint) => dataPoint.date); // Use full date as labels
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Daily Revenue",
        data: dataPoints.map((dataPoint) => dataPoint.revenue), // Use revenue data
        fill: false,
        borderColor: "#00144F",
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        // Change xAxes to x
        title: {
          display: true,
          text: "Days",
        },
        ticks: {
          callback: function (value, index, values) {
            const date = new Date(dataPoints[value].date);
            const month = date.getMonth();
            return months[month]; // Display month name
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
    <div className="DailyRevenueOverTime">
      <Line data={data} options={options} />
    </div>
  );
}

export default RevenueChart;
