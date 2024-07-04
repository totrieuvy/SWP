import { Button, Form, Input, Modal, Table, notification } from "antd";
import api from "../../../config/axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/features/counterSlice";
import { useForm } from "antd/es/form/Form";

function StaffProfile() {
  const [dataSource, setDataSource] = useState([]);
  const user = useSelector(selectUser);
  const [visible, setVisible] = useState(false);
  const [oldData, setOldData] = useState({});
  const [formVariable] = useForm();

  const fetchStaffProfile = async () => {
    try {
      const response = await api.get(`/api/staff-accounts/${user.id}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching staff profile:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchStaffProfile();
      const dataArray = Array.isArray(data) ? data : [data];
      setDataSource(dataArray);
      console.log(dataArray);
    };

    fetchData();
    document.title = "Thông tin nhân viên";
  }, []);

  const columns = [
    {
      title: "Tên đăng nhập",
      dataIndex: "username",
      key: "username",
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
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Cập nhật",
      dataIndex: "staffID",
      key: "staffID",
      render: (staffID, record) => (
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
      phone: record.phoneNumber,
      email: record.email,
    });
  };

  const handleCloseModal = () => {
    setVisible(false);
    formVariable.resetFields();
  };

  const handleFinish = async (values) => {
    try {
      const response = await api.put(`/api/staff/${user.id}`, values);
      console.log(response.data);
      const data = await fetchStaffProfile();
      const dataArray = Array.isArray(data) ? data : [data];
      setDataSource(dataArray);
      notification.success({
        message: "Thành công",
        description: "Cập nhật nhân viên thành công",
      });
      handleCloseModal();
    } catch (error) {
      console.error("Error updating staff profile:", error);
    }
  };

  return (
    <div className="StaffProfile">
      <Table dataSource={dataSource} columns={columns} />
      <Modal title="Cập nhật thông tin hồ sơ" open={visible} onCancel={handleCloseModal} onOk={() => formVariable.submit()}>
        <Form form={formVariable} layout="vertical" onFinish={handleFinish}>
          <Form.Item name="username" label="Tên đăng nhập">
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Số điện thoại">
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

export default StaffProfile;
