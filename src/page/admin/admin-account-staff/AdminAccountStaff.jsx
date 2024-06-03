import React, { useEffect, useState } from "react";
import "./AdminAccountStaff.scss";
import SidebarAdmin from "../sidebarAdmin/SidebarAdmin";
import api from "../../../config/axios";
import { Table } from "antd";

function AdminAccountStaff() {
  const [dataSource, setDataSource] = useState();
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
    const response = await api.get("/staff/read");
    console.log(response.data);
    setDataSource(response.data);
  };

  useEffect(() => {
    fetchListOfStaffofAdmin();
    document.title = "Thông tin của staff";
  }, []);
  return (
    <div className="AdminAccountStaff">
      <div className="AdminAccountStaff__sidebar">
        <SidebarAdmin />
      </div>
      <div className="AdminAccountStaff__content">
        <div className="AdminAccountStaff__content__title">
          <h2>Thông tin của staff</h2>
        </div>
        <div className="AdminAccountStaff__content__nd">
          <Table dataSource={dataSource} columns={columns} />
        </div>
      </div>
    </div>
  );
}

export default AdminAccountStaff;
