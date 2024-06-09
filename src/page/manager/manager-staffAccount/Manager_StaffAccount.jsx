import React, { useEffect, useState } from "react";
import SidebarManager from "../sidebarManager/SidebarManager";
import "./Manager_StaffAccount.scss";
import { Button, Form, Input, Modal, Popconfirm, Table, notification } from "antd";
import api from "../../../config/axios";
import { useForm } from "antd/es/form/Form";

function Manager_StaffAccount() {
  const [dataSource, setDataSource] = useState([]);
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
      title: "Ngày bắt đầu làm việc",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "Ca làm việc bắt đầu",
      dataIndex: "startTime",
      key: "startTime",
    },
    {
      title: "Ca làm việc kết thúc",
      dataIndex: "endTime",
      key: "endTime",
    },
    {
      title: "Quầy làm việc",
      dataIndex: "workArea",
      key: "workArea",
    },
    {
      title: "Xóa",
      dataIndex: "staffID",
      key: "staffID",
      render: (staffID) => (
        <Popconfirm
          title="Xóa nhân viên"
          description="Bạn có chắc muốn xóa nhân viên không?"
          onConfirm={() => handleDeleteStaff(staffID)}
          okText="Đồng ý"
          cancelText="Không"
        >
          <Button danger>Delete</Button>
        </Popconfirm>
      ),
    },
  ];
  const handleDeleteStaff = async (staffID) => {
    await api.delete(`/api/staff/delete/${staffID}`);

    const listAfterDelete = dataSource.filter((staff) => staff.staffID !== staffID);

    setDataSource(listAfterDelete);

    notification.success({
      message: "Thành công",
      description: "Xóa nhân viên thành công",
    });
  };

  const fetchListStaff = async () => {
    try {
      const response = await api.get("/api/staff/readall");
      console.log(response);
      const responseWithStatusTrue = response.data.filter((item) => item.status === 1);
      console.log(responseWithStatusTrue);
      setDataSource(responseWithStatusTrue);
    } catch (error) {
      console.error("Không thể lấy dữ liệu nhân viên", error);
    }
  };

  useEffect(() => {
    document.title = "Danh sách nhân viên";
    fetchListStaff();
  }, []);

  const handleOpenModal = () => {
    setVisible(true);
  };

  const handleCloseModal = () => {
    setVisible(false);
  };

  const handleOK = () => {
    formVariable.submit();
  };

  const handleFinish = async (values) => {
    console.log(values);
    const response = await api.post("/api/account/register", values);
    console.log(response);
    setDataSource([...dataSource, values]);
    formVariable.resetFields();
    handleCloseModal();
  };

  return (
    <div className="Manager_StaffAccount">
      <Button type="primary" className="Manager_StaffAccount_Button" onClick={handleOpenModal}>
        Thêm nhân viên
      </Button>
      <Table dataSource={dataSource} columns={columns} />
      <Modal title="Thêm nhân viên" open={visible} onCancel={handleCloseModal} onOk={handleOK}>
        <Form form={formVariable} labelCol={{ span: 24 }} onFinish={handleFinish}>
          <Form.Item
            label="Số điện thoại:"
            name={"phoneNumber"}
            rules={[
              {
                required: true,
                message: "Hãy nhập số điện thoại!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email:"
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
            label="Tên đăng nhập:"
            name={"username"}
            rules={[
              {
                required: true,
                message: "Hãy nhập tên đăng nhập!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mật khẩu:"
            name={"password"}
            rules={[
              {
                required: true,
                message: "Hãy nhập mật khẩu!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Ngày bắt đầu làm việc:"
            name={"startDate"}
            rules={[
              {
                required: true,
                message: "Hãy nhập ngày bắt đầu làm việc!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Tên tài khoản:"
            name={"accountName"}
            rules={[
              {
                required: true,
                message: "Hãy nhập tên tài khoản!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Lương:"
            name={"salary"}
            rules={[
              {
                required: true,
                message: "Hãy nhập lương!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Manager_StaffAccount;
