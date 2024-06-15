import { Table } from "antd";
import api from "../../../config/axios";
import React, { useEffect, useState } from "react";

function StaffCategory() {
  const [dataSource, setdataSource] = useState([]);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
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
