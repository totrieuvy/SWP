import { Button, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import React from "react";

function ManagerChangePassword() {
  const [formVariable] = useForm();
  const handleFinish = (values) => {
    console.log(values);
  };
  return (
    <div className="ManagerChangePassword">
      <Form form={formVariable} labelCol={{ span: 24 }} onFinish={handleFinish}>
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
