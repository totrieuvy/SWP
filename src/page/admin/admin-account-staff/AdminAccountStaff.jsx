import React, { useEffect, useState } from "react";
import "./AdminAccountStaff.scss";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Spin,
  Table,
  Tag,
  notification,
} from "antd";
import api from "../../../config/axios";
import { useForm } from "antd/es/form/Form";
import dayjs from "dayjs";

function AdminAccountStaff() {
  const [dataSource, setDataSource] = useState([]);
  const [visible, setVisible] = useState(0); // 0: closed, 1: create, 2: update
  const [oldData, setOldData] = useState({});
  const [formVariable] = useForm();
  const [loading, setLoading] = useState(true);

  const columns = [
    {
      title: "Tên đăng nhập",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Tên tài khoản",
      dataIndex: "accountName",
      key: "accountName",
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
      title: "Lương ",
      dataIndex: "salary",
      key: "salary",
    },
    {
      title: "Ngày bắt đầu làm việc",
      dataIndex: "startDate",
      key: "startDate",
      render: (startDate) => dayjs(startDate).format("YYYY-MM-DD"),
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
      dataIndex: "staffID",
      key: "staffID",
      render: (staffID, record) => (
        <Button
          type="primary"
          onClick={() => {
            setVisible(2);
            setOldData({ ...record, startDate: dayjs(record.startDate) });
          }}
        >
          Cập nhật
        </Button>
      ),
    },
    {
      title: "Xóa",
      dataIndex: "staffID",
      key: "staffID",
      render: (staffID) => (
        <Popconfirm
          title="Bạn có chắc muốn xóa nhân viên không?"
          onConfirm={() => handleDeleteStaff(staffID)}
          okText="Đồng ý"
          cancelText="Không"
        >
          <Button danger>Xóa</Button>
        </Popconfirm>
      ),
    },
  ];

  const handleDeleteStaff = async (staffID) => {
    await api.delete(`/api/staff-accounts/${staffID}`);
    fetchListStaff();
    notification.success({
      message: "Thành công",
      description: "Xóa nhân viên thành công",
    });
  };

  const fetchListStaff = async () => {
    try {
      const response = await api.get(
        "/api/staff-accounts/all/no-listing-shift"
      );

      setDataSource(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Không thể lấy dữ liệu nhân viên", error);
      setLoading(true);
    }
  };

  useEffect(() => {
    document.title = "Danh sách nhân viên";
    fetchListStaff();
  }, []);

  useEffect(() => {
    if (visible === 1) {
      formVariable.resetFields();
    } else if (visible === 2) {
      formVariable.setFieldsValue(oldData);
    }
  }, [visible, oldData, formVariable]);

  const handleOpenModal = () => {
    setVisible(1);
    formVariable.resetFields();
  };

  const handleCloseModal = () => {
    setVisible(0);
    formVariable.resetFields();
  };

  const handleOK = () => {
    formVariable.submit();
  };

  const handleFinish = async (values) => {
    values.startDate = dayjs(values.startDate).format("YYYY-MM-DD");
    console.log(values);
    try {
      if (visible === 1) {
        const response = await api.post("/api/account/register", values);
        console.log(response);
        // Check the status code or response data to handle duplicate entry case
        if (response.status === 200) {
          // assuming 200 OK for successful registration
          setDataSource([
            ...dataSource,
            { ...values, staffID: response.data.staffID },
          ]);
          notification.success({
            message: "Thành công",
            description: "Thêm nhân viên thành công",
          });
        } else {
          notification.error({
            message: "Lỗi",
            description: "Thông tin tài khoản bị trùng lặp",
          });
        }
      } else if (visible === 2) {
        const response = await api.put(
          `/api/staff-accounts/${oldData.staffID}`,
          {
            phoneNumber: values.phoneNumber,
            salary: values.salary,
            startDate: values.startDate,
            role: "ROLE_STAFF",
            email: values.email,
            username: values.username,
            accountName: values.accountName,
          }
        );
        console.log(response);
        fetchListStaff();
        notification.success({
          message: "Thành công",
          description: "Cập nhật nhân viên thành công",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.status === 400) {
        notification.error({
          message: "Lỗi",
          description: "Thông tin tài khoản bị trùng lặp",
        });
      } else {
        notification.error({
          message: "Lỗi",
          description: "Đã xảy ra lỗi khi thực hiện thao tác",
        });
      }
    }
    formVariable.resetFields();
    handleCloseModal();
  };

  return (
    <div className="Manager_StaffAccount">
      {loading ? (
        <Spin size="large" />
      ) : (
        <>
          <Button
            type="primary"
            className="Manager_StaffAccount_Button"
            onClick={handleOpenModal}
          >
            Thêm nhân viên
          </Button>
          <Table dataSource={dataSource} columns={columns} />
        </>
      )}
      <Modal
        title={
          visible === 1 ? "Thêm nhân viên" : "Cập nhật thông tin nhân viên"
        }
        visible={visible > 0}
        onCancel={handleCloseModal}
        onOk={handleOK}
      >
        <Form
          form={formVariable}
          labelCol={{ span: 24 }}
          onFinish={handleFinish}
        >
          <Form.Item
            label="Số điện thoại:"
            name="phoneNumber"
            rules={[
              {
                required: true,
                message: "Hãy nhập số điện thoại!",
              },
              {
                pattern: /^[0-9]*$/,
                message: "Số điện thoại chỉ được chứa các ký tự số!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email:"
            name="email"
            rules={[
              {
                required: true,
                message: "Hãy nhập email!",
              },
              {
                type: "email",
                message: "Phải nhập đúng định dạng email!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Tên đăng nhập:"
            name="username"
            rules={[
              {
                required: true,
                message: "Hãy nhập tên đăng nhập!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          {visible === 1 ? (
            <Form.Item
              label="Mật khẩu:"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Hãy nhập mật khẩu!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
          ) : (
            ""
          )}
          <Form.Item
            label="Ngày bắt đầu làm việc (YYYY-MM-DD):"
            name="startDate"
            rules={[
              {
                required: true,
                message: "Hãy nhập ngày bắt đầu làm việc!",
              },
            ]}
          >
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item
            label="Tên tài khoản:"
            name="accountName"
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
            name="salary"
            rules={[
              {
                required: true,
                message: "Hãy nhập lương!",
              },
              {
                type: "number",
                min: 1000000,
                max: 10000000,
                message: "Lương phải từ 1,000,000 đến 10,000,000 VND!",
              },
            ]}
          >
            <InputNumber min={1000000} max={10000000} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default AdminAccountStaff;
