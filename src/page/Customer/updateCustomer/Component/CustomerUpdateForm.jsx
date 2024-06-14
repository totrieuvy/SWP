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
import api from "../../../../config/axios";
import { useLocation, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const location = useLocation();
  const { record } = location.state || {};

  // Set initial value on mount
  useEffect(() => {
    form.setFieldsValue({
      pk_CustomerID: cid,
      email,
      phoneNumber,
      pointAmount,
      status,
    });
  }, [form, cid, email, phoneNumber, pointAmount, status]);
  const onFinish = async (value) => {
    try {
      const response = await api.put(
        `/api/customer/${value.pk_CustomerID}`,
        value
      );
      console.log("Response:", response.data);
      navigate(-1);
    } catch (error) {
      console.error("Error:", error);
    }
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
        <Form.Item name="pk_CustomerID" label="Customer ID">
          <Input disabled />
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
