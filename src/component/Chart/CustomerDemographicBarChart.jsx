import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);
const CustomerDemographicBarChart = () => {
  // Data for the chart
  const data = {
    labels: ["Gentlemen", "Madam", "Others"],
    datasets: [
      {
        label: "Demographics",
        data: [300, 350, 150], // Example data (replace with your actual data)
        backgroundColor: [
          "rgba(54, 162, 235, 0.6)", // Blue color for Boys
          "rgba(255, 99, 132, 0.6)", // Red color for Girls
          "rgba(75, 192, 192, 0.6)", // Green color for Others
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Configuration options
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <div style={{ height: "400px", width: "600px" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default CustomerDemographicBarChart;
