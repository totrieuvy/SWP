import React, { useEffect, useState } from "react";
import "./AdmiAccountManager.scss";
import api from "../../../config/axios";
import { Button, Form, Input, Modal, Popconfirm, Spin, Table, notification } from "antd";
import { useForm } from "antd/es/form/Form";

function AdminAccountManager() {
  const [visible, setVisible] = useState(false);
  const [formVariable] = useForm();
  const [loading, setLoading] = useState(true);
  const columns = [
    {
      title: "Tên",
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
      title: "Xóa",
      dataIndex: "pk_userID",
      key: "pk_userID",
      render: (pk_userID) => (
        <Popconfirm
          title="Xóa nhân viên"
          description="Bạn có chắc muốn xóa quản lí không?"
          onConfirm={() => handleDeleteManager(pk_userID)}
          okText="Đồng ý"
          cancelText="Không"
        >
          <Button danger>Xóa</Button>
        </Popconfirm>
      ),
    },
  ];
  const handleDeleteManager = async (pk_userID) => {
    const response = await api.delete(`/api/manager/${pk_userID}`);
    const filterAccountAfterDelete = dataSource.filter((data) => data.pk_userID != pk_userID);
    setDataSource(filterAccountAfterDelete);
    notification.success({
      message: "Thành công",
      description: "Xóa quản lí thành công",
    });
  };

  const [dataSource, setDataSource] = useState([]);

  const fetchListOfManager = async () => {
    try {
      const response = await api.get("/api/manager");
      console.log(response.data);
      const responseWithStatusTrue = response.data.filter((item) => item.status === 1);
      setDataSource(responseWithStatusTrue);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(true);
    }
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
    try {
      console.log(values);
      const response = await api.post("/api/manager", values);
      console.log(response);
      setDataSource([...dataSource, values]);
      formVariable.resetFields();
      handleCloseModal();
      notification.success({
        message: "Thành công",
        description: "Thêm tài khoản quản lí thánh công",
      });
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) {
        if (error.response.data == "Duplicate ") {
          let change = "Trùng email!";
          notification.error({ message: "Thất bại", description: change });
        }
      }
    }
  };

  return (
    <div className="AdminAccountManager">
      {loading ? (
        <Spin size="large" />
      ) : (
        <>
          <Button type="primary" onClick={handleOpenModal}>
            Thêm quản lí
          </Button>
          <Table dataSource={dataSource} columns={columns} />
        </>
      )}
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
            name={"username"}
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
            label={"Tên tài khoản"}
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
            label={"Mật khẩu"}
            name={"apassword"}
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
        </Form>
      </Modal>
    </div>
  );
}

export default AdminAccountManager;
