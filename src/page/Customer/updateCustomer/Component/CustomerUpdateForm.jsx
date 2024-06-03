import React, { useEffect } from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Mentions,
  Select,
  Space,
} from "antd";
const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 14,
    },
  },
};

function CustomerUpdateForm({ cid, email, phoneNumber, pointAmount, status }) {
  const [form] = Form.useForm();

  // Set initial value on mount
  useEffect(() => {
    form.setFieldsValue({
      cid,
      email,
      phoneNumber,
      pointAmount,
      status,
    });
  }, [form, cid, email, phoneNumber, pointAmount, status]);
  const onFinish = (values) => {
    console.log("Received values:", values);
  };

  return (
    <>
      <Form
        form={form}
        onFinish={onFinish}
        {...formItemLayout}
        variant="filled"
        style={{
          maxWidth: 600,
        }}
      >
        <Form.Item
          name="cid"
          label="Customer ID"
          rules={[
            { required: true, message: "Please input your customer ID!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          label="Phone Number"
          rules={[
            { required: true, message: "Please input your phone number!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="pointAmount"
          label="Point Amount"
          rules={[
            { required: true, message: "Please input the point amount!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="status"
          label="Status"
          rules={[{ required: true, message: "Please input the status!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 6,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default CustomerUpdateForm;
