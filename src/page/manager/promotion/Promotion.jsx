import { Spin, Table, Tag } from "antd";
import api from "../../../config/axios";
import React, { useEffect, useState } from "react";

function Promotion() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    {
      title: "Tên",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Mô tả",
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
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status ? "green" : "red"}>{status ? "Còn hạn giảm giá" : "Hết hạn giảm giá"}</Tag>
      ),
      sorter: (a, b) => a.status - b.status,
      defaultSortOrder: "descend",
    },
  ];

  const fetchPromotion = async () => {
    try {
      const response = await api.get("/api/promotion/list");
      setDataSource(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch promotions:", error);
      setLoading(true);
    }
  };

  useEffect(() => {
    fetchPromotion();
    document.title = "Chính sách ưu đãi";
  }, []);

  return (
    <div className="ManagerPromotion">
      {loading ? <Spin size="large" /> : <Table dataSource={dataSource} columns={columns} rowKey="code" />}
    </div>
  );
}

export default Promotion;
