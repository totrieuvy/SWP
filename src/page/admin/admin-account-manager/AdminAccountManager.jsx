import React, { useEffect, useState } from "react";
import "./AdmiAccountManager.scss";
import SidebarAdmin from "../sidebarAdmin/SidebarAdmin";
import api from "../../../config/axios";
import { Button, Form, Input, Modal, Table } from "antd";
import { useForm } from "antd/es/form/Form";

function AdminAccountManager() {
  const [visible, setVisible] = useState(false);
  const [formVariable] = useForm();
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
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
  ];

  const [dataSource, setDataSource] = useState([]);

  const fetchListOfManager = async () => {
    const responnse = await api.get("/api/manager");
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
  const handleSubmit = () => {
    formVariable.submit();
  };
  const handleFinish = async (values) => {
    console.log(values);
    const response = await api.post("/api/manager", values);
    console.log(response);
    setDataSource([...dataSource, values]);
    formVariable.resetFields();
    handleCloseModal();
  };

  return (
    <div className="AdminAccountManager">
      <Button type="primary" onClick={handleOpenModal}>
        Thêm quản lí
      </Button>
      <Table dataSource={dataSource} columns={columns} />
      <Modal title="Thêm quản lí " open={visible} onOk={handleSubmit} onCancel={handleCloseModal}>
        <Form
          form={formVariable}
          labelCol={{
            span: 24,
          }}
          onFinish={handleFinish}
        >
          <Form.Item
            label={"Tên người dùng"}
            name={"ausername"}
            rules={[
              {
                required: true,
                message: "Hãy nhập tên người dùng!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={"Mật khẩu"}
            name={"apassword"}
            rules={[
              {
                required: true,
                message: "Hãy nhập mật khẩu!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={"Email"}
            name={"email"}
            rules={[
              {
                required: true,
                message: "Hãy nhập email!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={"Vai trò"}
            name={"role"}
            initialValue={"ROLE_MANAGER"} 
            rules={[
              {
                required: true,
                message: "Hãy nhập email!",
              },
            ]}
          >
            <Input disabled />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default AdminAccountManager;
