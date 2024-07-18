import React, { useEffect, useState } from "react";
import api from "../../../config/axios";
import {
  Button,
  Form,
  Input,
  Modal,
  Popconfirm,
  Spin,
  Table,
  Tag,
  notification,
} from "antd";
import { useForm } from "antd/es/form/Form";

function AdminAccountManager() {
  const [modalType, setModalType] = useState(null); // null: closed, "create": create, "update": update
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
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === 1 ? "green" : "red"}>
          {status === 1 ? "Đang hoạt động" : "Không hoạt động"}
        </Tag>
      ),
      sorter: (a, b) => a.status - b.status,
    },
    {
      title: "Cập nhật",
      dataIndex: "pk_userID",
      key: "pk_userID",
      render: (pk_userID, record) => (
        <>
          <Button
            type="primary"
            onClick={() => {
              setModalType("update");
              setOldData(record);
              formVariable.setFieldsValue(record);
            }}
          >
            Cập nhật
          </Button>
          <Popconfirm
            title="Xóa quản lí"
            description="Bạn có chắc muốn xóa quản lí không?"
            onConfirm={() => handleDeleteManager(record.pk_userID)}
            okText="Đồng ý"
            cancelText="Không"
          >
            <Button style={{ marginLeft: "10px" }} danger>
              Xóa
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  const handleDeleteManager = async (pk_userID) => {
    try {
      const response = await api.delete(`/api/manager/${pk_userID}`);
      console.log(response);
      fetchListOfManager();
      notification.success({
        message: "Thành công",
        description: "Xóa quản lí thành công",
      });
    } catch (error) {
      console.log("Delete error", error);
    }
  };

  const fetchListOfManager = async () => {
    try {
      const response = await api.get("/api/manager");
      console.log(response.data);

      setDataSource(response.data);
      setLoading(false);
    } catch (error) {
      console.log("Fetch error", error);
      setLoading(true);
    }
  };

  useEffect(() => {
    fetchListOfManager();
    document.title = "Danh sách quản lí";
  }, []);

  const handleOpenModal = (type) => {
    setModalType(type);
    formVariable.resetFields();
  };

  const handleCloseModal = () => {
    setModalType(null);
  };

  const handleSubmit = () => {
    formVariable.submit();
  };

  const handleFinish = async (values) => {
    console.log(values);
    try {
      if (modalType === "create") {
        const response = await api.post("/api/manager", values);
        console.log(response);
        fetchListOfManager(); // Reload data after creation
        notification.success({
          message: "Thành công",
          description: "Thêm tài khoản quản lí thành công",
        });
      } else if (modalType === "update") {
        const response = await api.put(`/api/manager/${oldData.pk_userID}`, {
          email: values.email,
          username: values.username,
          accountName: values.accountName,
          role: "ROLE_MANAGER",
          apassword: values.apassword,
        });
        console.log(response);
        fetchListOfManager(); // Reload data after update
        notification.success({
          message: "Thành công",
          description: "Cập nhật tài khoản quản lí thành công",
        });
      }
    } catch (error) {
      console.log("Error", error);
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data === "Username đã được sử dụng."
      ) {
        notification.error({
          message: "Lỗi",
          description: "Tên đăng nhập đã được sử dụng.",
        });
      }
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
          <Button type="primary" onClick={() => handleOpenModal("create")}>
            Thêm quản lí
          </Button>
          <Table dataSource={dataSource} columns={columns} />
        </>
      )}
      <Modal
        title={
          modalType === "create" ? "Thêm quản lí" : "Cập nhật thông tin quản lí"
        }
        visible={modalType !== null}
        onOk={handleSubmit}
        onCancel={handleCloseModal}
      >
        <Form
          form={formVariable}
          labelCol={{ span: 24 }}
          onFinish={handleFinish}
        >
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
          {modalType === "create" && (
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
