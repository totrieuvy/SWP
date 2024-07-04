import { Button, Modal, Table, Form, Input } from "antd";
import api from "../../../config/axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/features/counterSlice";

function StaffProfile() {
  const [dataSource, setDataSource] = useState([]);
  const user = useSelector(selectUser);
  const [visible, setVisible] = useState(false);
  const [oldData, setOldData] = useState({});
  const [form] = Form.useForm();

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
      title: "Tên",
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
    setOldData(record);
    form.setFieldsValue(record);
    setVisible(true);
  };

  const handleCloseModal = () => {
    setVisible(false);
    form.resetFields();
  };

  const handleUpdate = async (values) => {
    try {
      await api.put(`/api/staff-accounts/${user.id}`, values);
      const data = await fetchStaffProfile();
      const dataArray = Array.isArray(data) ? data : [data];
      setDataSource(dataArray);
      handleCloseModal();
    } catch (error) {
      console.error("Error updating staff profile:", error);
    }
  };

  return (
    <div className="StaffProfile">
      <Table dataSource={dataSource} columns={columns} />
      <Modal title="Cập nhật thông tin" visible={visible} onCancel={handleCloseModal} onOk={() => form.submit()}>
        <Form form={form} layout="vertical" onFinish={handleUpdate}>
          <Form.Item name="username" label="Tên">
            <Input />
          </Form.Item>
          <Form.Item name="phoneNumber" label="Số điện thoại">
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
