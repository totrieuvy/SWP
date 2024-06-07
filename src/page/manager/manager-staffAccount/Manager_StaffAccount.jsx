import React, { useEffect, useState } from "react";
import SidebarManager from "../sidebarManager/SidebarManager";
import "./Manager_StaffAccount.scss";
import { Button, Modal, Table } from "antd";
import api from "../../../config/axios";
function Manager_StaffAccount() {
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
      title: "Lương (tính theo đô)",
      dataIndex: "salary",
      key: "salary",
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "startDate",
      key: "startDate",
    },
  ];

  const fetchListStaff = async () => {
    const response = await api.get("/api/staff");
    console.log(response.data);
    setDataSource(response.data);
  };

  useEffect(() => {
    document.title = "Danh sách nhân viên";
    fetchListStaff();
  }, []);

  return (
    <div className="Manager_StaffAccount">
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
}

export default Manager_StaffAccount;
