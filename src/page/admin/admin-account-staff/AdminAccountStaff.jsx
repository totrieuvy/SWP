import React, { useEffect, useState } from "react";
import "./AdminAccountStaff.scss";
import api from "../../../config/axios";
import { Button, Table } from "antd";
// import { selectUser } from "redux/features/counterSlice";

function AdminAccountStaff() {
  const [dataSource, setDataSource] = useState([]);
  const columns = [
    {
      title: "Tên",
      dataIndex: "ausername",
      key: "ausername",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Lương",
      dataIndex: "salary",
      key: "salary",
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "startDate",
      key: "startDate",
    },
  ];
  const fetchListOfStaffofAdmin = async () => {
    const response = await api.get("/api/staff/readall");
    console.log(response.data);
    const responseWithStatusTrue = response.data.filter((item) => item.status === 1);
    setDataSource(responseWithStatusTrue);
  };

  useEffect(() => {
    fetchListOfStaffofAdmin();
    document.title = "Thông tin của staff";
  }, []);
  return (
    <div className="AdminAccountStaff">
      <Button type="primary">Add new staff</Button>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
}

export default AdminAccountStaff;
