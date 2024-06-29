import { Table } from "antd";
import api from "../../../config/axios";
import React, { useEffect, useState } from "react";

function StaffCategory() {
  const [dataSource, setdataSource] = useState([]);
  const columns = [
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
  ];
  const fetchStaffCategory = async () => {
    const response = await api.get("/api/category");

    console.log(response);
    setdataSource(response.data);
  };
  useEffect(() => {
    fetchStaffCategory();
    document.title = "Thể loại";
  }, []);
  return (
    <div className="StaffCategory">
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
}

export default StaffCategory;
