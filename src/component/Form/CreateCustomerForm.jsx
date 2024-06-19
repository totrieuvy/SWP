import React from "react";
import { Form, Input, Button, Select, message } from "antd";
import api from "../../config/axios";
import "./style.css";
const { Option } = Select;

const CreateCustomerForm = ({ onClose }) => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const response = await api.post("/api/customer", values);
      message.success("Customer created successfully!");
      onClose();
    } catch (error) {
      console.error("Failed to create customer:", error);
      message.error("Failed to create customer. Please try again.");
    }
  };

  return (
    <div className="CustomerCreateForm">
      <Button onClick={onClose}>Close</Button>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="phoneNumber"
          label="Phone Number"
          rules={[
            { required: true, message: "Please enter your phone number" },
            { pattern: /^\d{10}$/, message: "Phone number must be 10 digits" }, // Example pattern validation
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="gender"
          label="Gender"
          rules={[{ required: true, message: "Please select your gender" }]}
        >
          <Select>
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
            <Option value="other">Other</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateCustomerForm;
