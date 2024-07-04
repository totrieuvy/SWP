import React, { useEffect, useState } from "react";
import "./ManagerProfile.scss";
import { Button, Form, Input, Modal, Table, notification } from "antd";
import api from "../../../config/axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/features/counterSlice";
import { useForm } from "antd/es/form/Form";

function ManagerProfile() {
  const [dataSource, setDataSource] = useState([]);
  const user = useSelector(selectUser);
  const [formVariable] = useForm();
  const [oldData, setOldData] = useState({});
  const [visible, setVisible] = useState(false);

  const fetchManagerProfile = async () => {
    try {
      const response = await api.get(`/api/manager/${user.id}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching manager profile:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchManagerProfile();
      const dataArray = Array.isArray(data) ? data : [data];
      setDataSource(dataArray);
      console.log(dataArray);
    };

    fetchData();
    document.title = "Thông tin quản lí";
  }, []);

  const columns = [
    {
      title: "Tên đăng nhập",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Tên tài khoản",
      dataIndex: "accountName",
      key: "accountName",
    },
    {
      title: "Cập nhật",
      dataIndex: "pk_userID",
      key: "pk_userID",
      render: (pk_userID, record) => (
        <Button
          type="primary"
          onClick={() => {
            handleOpenModal(record);
          }}
        >
          Cập nhật
        </Button>
      ),
    },
  ];

  const handleOpenModal = (record) => {
    setVisible(true);
    setOldData(record);
    formVariable.setFieldsValue({
      username: record.username,
      accountName: record.accountName,
      email: record.email,
    });
  };

  const handleCloseModal = () => {
    setVisible(false);
    formVariable.resetFields();
  };

  const handleFinish = async (values) => {
    try {
      const response = await api.put(`/api/managers/${user.id}`, values);
      console.log(response.data);
      const data = await fetchManagerProfile();
      const dataArray = Array.isArray(data) ? data : [data];
      setDataSource(dataArray);
      notification.success({
        message: "Thành công",
        description: "Cập nhật hồ sơ thành công",
      });
      handleCloseModal();
    } catch (error) {
      console.error("Error updating manager profile:", error);
    }
  };

  return (
    <div className="ManagerProfile">
      <Table dataSource={dataSource} columns={columns} />
      <Modal
        title="Cập nhật thông tin hồ sơ"
        open={visible}
        onCancel={handleCloseModal}
        onOk={() => formVariable.submit()}
      >
        <Form form={formVariable} layout="vertical" onFinish={handleFinish}>
          <Form.Item name="username" label="Tên đăng nhập">
            <Input />
          </Form.Item>
          <Form.Item name="accountName" label="Tên tài khoản">
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ManagerProfile;
