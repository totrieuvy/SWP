import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { Button, Input, message } from "antd";
import api from "../../../config/axios";

function SaleComparision() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [years, setYears] = useState({ year1: "", year2: "" });
  const [dataRevenue, setDataRevenue] = useState([]);
  const [dataQuantity, setDataQuantity] = useState([]);
  const [dataCustomerSignup, setDataCustomerSignup] = useState([]);
  const [yearData, setYearData] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setYears((prev) => ({ ...prev, [name]: value }));
  };

  const handleConvertYearToArray = (year) => {
    const yearArray = [];
    for (let i = parseInt(year.year1); i <= parseInt(year.year2); i++) {
      yearArray.push(i);
    }
    setYearData(yearArray);
  };

  const fetchData = async () => {
    const year1 = parseInt(years.year1);
    const year2 = parseInt(years.year2);

    if (!years.year1) {
      message.error("Bắt buộc nhập năm bắt đầu");
      return;
    }

    if (!years.year2) {
      message.error("Bắt buộc nhập năm kết thúc");
      return;
    }

    if (isNaN(year1) || isNaN(year2)) {
      message.error("Năm phải là một số");
      return;
    }
    if (year1 >= year2) {
      message.error("Năm bắt đầu phải nhỏ hơn năm kết thúc");
      return;
    }

    try {
      const response = await api.get("/api/Dashboard/compare-sale-year", {
        params: {
          startYear: years.year1,
          endYear: years.year2,
        },
      });
      handleConvertYearToArray(years);
      setDataRevenue(Object.values(response.data.revenue));
      setDataQuantity(Object.values(response.data.quantity));
      setDataCustomerSignup(Object.values(response.data.customerSignup));
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    document.title = "So sánh giữa các năm";
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      chartInstance.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: yearData,
          datasets: [
            {
              label: "Doanh thu",
              data: dataRevenue,
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
              yAxisID: "left-y-axis",
            },
            {
              label: "Số lượng",
              data: dataQuantity,
              borderColor: "rgba(153, 102, 255, 1)",
              borderWidth: 1,
              yAxisID: "right-y-axis",
            },
            {
              label: "Số khách hàng",
              data: dataCustomerSignup,
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
              yAxisID: "right-y-axis",
            },
          ],
        },
        options: {
          scales: {
            "left-y-axis": {
              title: {
                display: true,
                text: "Doanh thu",
              },
              type: "linear",
              position: "left",
              beginAtZero: true,
            },
            "right-y-axis": {
              title: {
                display: true,
                text: "Số lượng / Số khách hàng",
              },
              type: "linear",
              position: "right",
              beginAtZero: true,
            },
            x: {
              title: {
                display: true,
                text: "Year",
              },
            },
          },
        },
      });
    }
  }, [yearData, dataRevenue, dataQuantity, dataCustomerSignup]);

  return (
    <div>
      <Input
        type="text"
        name="year1"
        value={years.year1}
        onChange={handleChange}
        placeholder="Nhập năm bắt đầu"
        style={{ width: 200, marginRight: 10 }}
      />
      <Input
        type="text"
        name="year2"
        value={years.year2}
        onChange={handleChange}
        placeholder="Nhập năm kết thúc"
        style={{ width: 200, marginRight: 10 }}
      />
      <Button type="primary" onClick={fetchData}>
        So sánh
      </Button>
      <canvas ref={chartRef} id="myChart"></canvas>
    </div>
  );
}

export default SaleComparision;
