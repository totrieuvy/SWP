import React, { useEffect, useState } from "react";
import SidebarManager from "../sidebarManager/SidebarManager";
import "./Manager_StaffAccount.scss";
import { Button, Modal, Table } from "antd";
import api from "../../../config/axios";
function Manager_StaffAccount() {
  const [visible, setVisible] = useState(false);
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
      title: "Điện thoại",
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

  const handleOpenModal = () => {
    setVisible(true);
  };

  const handleCloseModal = () => {
    setVisible(false);
  };

  const fetchAllStaffList = async () => {
    const response = await api.get("/staff/read");
    console.log(response);
    setDataSource(response.data);
  };
  useEffect(() => {
    fetchAllStaffList();
    document.title = "Danh sách nhân viên";
  }, []);

  return (
    <div className="Manager_StaffAccount">
      <div className="Manager_StaffAccount__sidebar">
        <SidebarManager />
      </div>
      <div className="Manager_StaffAccount__content">
        <h2 className="Manager_StaffAccount__content__title">Thông tin của staff</h2>
        <Button className="Manager_StaffAccount__content__button" type="primary" onClick={handleOpenModal}>
          Add staff
        </Button>
        <Table dataSource={dataSource} columns={columns} />
        <Modal title="Add new staff" open={visible} onCancel={handleCloseModal}>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    </div>
  );
}

export default Manager_StaffAccount;
