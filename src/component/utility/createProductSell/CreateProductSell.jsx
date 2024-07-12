import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Button,
  Select,
  Upload,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import api from "../../../config/axios";

const { Option } = Select;

const CreateProductSell = () => {
  const [imageFile, setImageFile] = useState(null);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/api/category`);
        setCategory(response.data);
      } catch (error) {
        console.error("Error fetching the categories", error);
      }
    };

    fetchData();
  }, []);

  const handleFileChange = ({ file }) => {
    setImageFile(file);
  };

  const onFinish = (values) => {
    const formData = new FormData();
    if (imageFile) {
      formData.append("image", imageFile);
    }
    Object.keys(values).forEach((key) => formData.append(key, values[key]));

    api
      .post("/api/productSell/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        message.success("Product created successfully");
      })
      .catch((error) => {
        message.error("Failed to create product");
      });
  };

  return (
    <Form onFinish={onFinish} layout="vertical">
      <Form.Item name="pname" label="Product Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="pdescription" label="Product Description">
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        name="productCode"
        label="Product Code"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="metalType" label="Metal Type">
        <Input />
      </Form.Item>
      <Form.Item name="gemstoneType" label="Gemstone Type">
        <Input />
      </Form.Item>
      <Form.Item name="manufacturer" label="Manufacturer">
        <Input />
      </Form.Item>
      <Form.Item name="chi" label="CHI">
        <InputNumber min={0} />
      </Form.Item>
      <Form.Item name="carat" label="Carat">
        <InputNumber min={0} />
      </Form.Item>

      <Form.Item
        name="category_id"
        label="Category"
        rules={[{ required: true }]}
      >
        <Select placeholder="Select a category">
          {category.map((category) => (
            <Option key={category.id} value={category.id}>
              {category.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Image">
        <Upload beforeUpload={() => false} onChange={handleFileChange}>
          <Button icon={<UploadOutlined />}>Select File</Button>
        </Upload>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateProductSell;
