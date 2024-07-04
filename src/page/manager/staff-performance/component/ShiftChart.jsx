import React from "react";
import { Pie } from "react-chartjs-2";

const ShiftChart = ({ shiftData }) => {
  // Aggregate shift data to count active and finished shifts
  const shiftCounts = shiftData.reduce(
    (acc, shift) => {
      if (shift.status === "Active") {
        acc.active += 1;
      } else if (shift.status === "Finished") {
        acc.finished += 1;
      }
      return acc;
    },
    { active: 0, finished: 0 }
  );

  const chartData = {
    labels: ["Active Shifts", "Finished Shifts"],
    datasets: [
      {
        label: "Shift Status",
        data: [shiftCounts.active, shiftCounts.finished],
        backgroundColor: ["rgba(54, 162, 235, 0.6)", "rgba(255, 99, 132, 0.6)"],
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
  };

  return (
    <>
      <div style={{ width: "500px", height: "500px" }}>
        <Pie data={chartData} options={options} />
      </div>
    </>
  );
};

export default ShiftChart;
