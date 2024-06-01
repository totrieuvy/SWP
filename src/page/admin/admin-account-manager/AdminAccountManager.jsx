import React, { useEffect, useState } from "react";
import "./AdmiAccountManager.scss";
import SidebarAdmin from "../sidebarAdmin/SidebarAdmin";
import api from "../../../config/axios";
import { Button, Modal, Table } from "antd";
import { useForm } from "antd/es/form/Form";

function AdminAccountManager() {
  const [visible, setVisible] = useState(false);
  const formVariable = useForm();
  const columns = [
    {
      title: "Name",
      dataIndex: "accountName",
      key: "accountName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Delete",
      dataIndex: "id",
      key: "id",
    },
  ];

  const [dataSource, setDataSource] = useState([]);

  const fetchListOfManager = async () => {
    const responnse = await api.get("/account/managers");
    console.log(responnse.data);
    setDataSource(responnse.data);
  };
  useEffect(() => {
    fetchListOfManager();
    document.title = "Danh sách quản lí";
  }, []);

  const handleOpenModal = () => {
    setVisible(true);
  };
  const handleCloseModal = () => {
    setVisible(false);
  };

  return (
    <div className="AdminAccountManager">
      <div className="AdminAccountManager__sidebar">
        <SidebarAdmin />
      </div>

      <div className="AdminAccountManager__content">
        <h2 className="AdminAccountManager__content__title">Thông tin của quản lí</h2>
        <Button type="primary" onClick={handleOpenModal}>
          Thêm quản lí mới
        </Button>
        <div className="AdminAccountManager__content__nd">
          <Table dataSource={dataSource} columns={columns} />
        </div>
        <Modal title="Thêm quản lí mới" open={visible} onCancel={handleCloseModal}></Modal>
      </div>
    </div>
  );
}

export default AdminAccountManager;
