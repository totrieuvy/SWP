import { Table } from "antd";
import api from "../../../config/axios";
import React, { useEffect, useState } from "react";

function Promotion() {
  const [dataSource, setDataSource] = useState([]);

  const columns = [
    {
      title: "Tên",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "Giảm giá",
      dataIndex: "discount",
      key: "discount",
    },
  ];

  const fetchPromotion = async () => {
    const response = await api.get("/api/promotion/active");
    console.log(response.data);
    setDataSource(response.data);
  };
  useEffect(() => {
    fetchPromotion();
    document.title = "Chính sách ưu đãi";
  }, []);
  return (
    <div className="ManagerPromotion">
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
}

export default Promotion;
