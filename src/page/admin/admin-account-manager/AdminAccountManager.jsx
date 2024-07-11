import React, { useEffect, useState } from "react";
import api from "../../../config/axios";
import { Button, Form, Input, Modal, Popconfirm, Spin, Table, notification } from "antd";
import { useForm } from "antd/es/form/Form";

function AdminAccountManager() {
  const [visible, setVisible] = useState(0); // 0: closed, 1: create, 2: update
  const [formVariable] = useForm();
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState([]);
  const [oldData, setOldData] = useState({});

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
            setVisible(2);
            setOldData(record);
            formVariable.setFieldsValue(record);
          }}
        >
          Cập nhật
        </Button>
      ),
    },
    {
      title: "Xóa",
      dataIndex: "pk_userID",
      key: "pk_userID",
      render: (pk_userID) => (
        <Popconfirm
          title="Xóa quản lí"
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
    console.log(response);
    const filterAccountAfterDelete = dataSource.filter((data) => data.pk_userID != pk_userID);
    setDataSource(filterAccountAfterDelete);
    notification.success({
      message: "Thành công",
      description: "Xóa quản lí thành công",
    });
  };

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
    setVisible(1);
    formVariable.resetFields();
  };

  const handleCloseModal = () => {
    setVisible(0);
  };

  const handleSubmit = () => {
    formVariable.submit();
  };

  const handleFinish = async (values) => {
    console.log(values);
    try {
      if (visible === 1) {
        const response = await api.post("/api/manager", values);
        console.log(response);
        setDataSource([...dataSource, values]);
        notification.success({
          message: "Thành công",
          description: "Thêm tài khoản quản lí thành công",
        });
      } else if (visible === 2) {
        const response = await api.put(`/api/manager/${oldData.pk_userID}`, {
          email: values.email,
          username: values.username,
          accountName: values.accountName,
          role: "ROLE_MANAGER",
          apassword: values.apassword,
        });
        console.log(response);
        fetchListOfManager();
        notification.success({
          message: "Thành công",
          description: "Cập nhật tài khoản quản lí thành công",
        });
      }
    } catch (error) {
      console.log("error", error);
    }
    formVariable.resetFields();
    handleCloseModal();
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
      <Modal
        title={visible === 1 ? "Thêm quản lí" : "Cập nhật thông tin quản lí"}
        open={visible > 0}
        onOk={handleSubmit}
        onCancel={handleCloseModal}
      >
        <Form form={formVariable} labelCol={{ span: 24 }} onFinish={handleFinish}>
          <Form.Item
            label={"Tên đăng nhập"}
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
          {visible === 1 && (
            <Form.Item
              label={"Mật khẩu"}
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
          )}
          <Form.Item
            label={"Email"}
            name={"email"}
            rules={[
              {
                required: true,
                message: "Hãy nhập email!",
              },
              {
                type: "email",
                message: "hãy nhập đúng dạng email",
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
