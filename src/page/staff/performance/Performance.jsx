import { Spin, Table } from "antd";
import api from "../../../config/axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/features/counterSlice";

function Performance() {
  const [dataSource, setDataSource] = useState([]);
  const user = useSelector(selectUser);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    document.title = "Năng suất";
  }, []);

  const fetchPerformance = async () => {
    try {
      console.log(user.id);
      const response = await api.get(`/api/Dashboard/staff-statistics?staffId=${user.id}`);
      console.log(response.data);
      setDataSource([response.data]);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(true);
    }
  };

  useEffect(() => {
    fetchPerformance();
  }, []);

  const columns = [
    {
      title: "Số khách đã đăng kí",
      dataIndex: "customerSignUps",
      key: "customerSignUps",
    },
    {
      title: "Tổng doanh thu",
      dataIndex: "revenueGenerated",
      key: "revenueGenerated",
    },
    {
      title: "Số sản phẩm đã bán",
      dataIndex: "salesCount",
      key: "salesCount",
    },
    {
      title: "Số ca đã làm",
      dataIndex: "shiftsCount",
      key: "shiftsCount",
    },
  ];

  return (
    <div className="Performance">
      {loading ? <Spin size="large" /> : <Table dataSource={dataSource} columns={columns} />}
    </div>
  );
}

export default Performance;
