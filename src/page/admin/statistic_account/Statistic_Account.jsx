import { Pie } from "react-chartjs-2";
import api from "../../../config/axios";
import React, { useState, useEffect } from "react";
import "./Statistic_Account.scss";
import { Spin } from "antd";

function Statistic_Account() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await api.get("/api/all");
      console.log(response.data);
      setAccounts(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(true);
    }
  };

  useEffect(() => {
    fetchData();
    document.title = "Thống kê tài khoản";
  }, []);

  const roleCounts = accounts.reduce(
    (acc, user) => {
      if (user && user.role) {
        if (user.status === 1) {
          if (user.role === "ROLE_ADMIN") acc.ROLE_ADMIN += 1;
          else if (user.role === "ROLE_MANAGER") acc.ROLE_MANAGER += 1;
          else if (user.role === "ROLE_STAFF") acc.ROLE_STAFF += 1;
        }
      }
      return acc;
    },
    { ROLE_ADMIN: 0, ROLE_MANAGER: 0, ROLE_STAFF: 0 }
  );

  const data = {
    labels: ["Chủ", "Quản lí", "Nhân viên"],
    datasets: [
      {
        data: [roleCounts.ROLE_ADMIN, roleCounts.ROLE_MANAGER, roleCounts.ROLE_STAFF],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  return (
    <div className="Statistic_Account">
      <div>
        {loading ? (
          <Spin size="large" />
        ) : (
          <>
            <h1>Biểu đồ tròn thống kê tài khoản</h1>
            <div className="chart-container">
              <Pie data={data} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Statistic_Account;
