import { Button, Form, Input, notification } from "antd";
import { useForm } from "antd/es/form/Form";
import api from "../../../config/axios";
import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/features/counterSlice";

function ManagerChangePassword() {
  const [formVariable] = useForm();
  const user = useSelector(selectUser);

  const onFinish = async ({ oldPassword, newPassword }) => {
    try {
      const response = await api.put(`/api/account/change/${user.id}`, { oldPassword, newPassword });
      console.log(response);

      notification.success({
        message: "Thành công",
        description: "Đổi mật khẩu thành công",
      });

      formVariable.resetFields();
    } catch (error) {
      console.log(error.response.data);
      notification.error({
        message: "Thất bại",
        description: error.response.data,
      });
    }
  };

  React.useEffect(() => {
    document.title = "Đổi mật khẩu";
  }, []);
  return (
    <div className="ManagerChangePassword">
      <Form form={formVariable} labelCol={{ span: 24 }} onFinish={onFinish}>
        <Form.Item
          label="Nhập mật khẩu cũ:"
          name="oldPassword"
          rules={[
            {
              required: true,
              message: "Hãy nhập mật khẩu cũ!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Nhập mật khẩu mới:"
          name="newPassword"
          rules={[
            {
              required: true,
              message: "Hãy nhập mật khẩu mới!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Xác nhận lại mật khẩu mới:"
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: "Hãy xác nhận lại mật khẩu mới!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Mật khẩu xác nhận không khớp!"));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Đổi mật khẩu
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default ManagerChangePassword;
