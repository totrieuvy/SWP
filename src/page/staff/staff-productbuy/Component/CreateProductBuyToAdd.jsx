import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Checkbox,
  Button,
  Select,
  Modal,
  message,
} from "antd";
import CustomWebcam from "./CustomWebcam";
import api from "../../../../config/axios";
import { Option } from "antd/es/mentions";
import WebSocket from "../../../../config/WebSocket";

function CreateProductBuyToAdd({ appendOrder }) {
  const [form] = Form.useForm();
  const [noMetal, setNoMetal] = useState(false);
  const [noGemstone, setNoGemstone] = useState(false);
  const [image, setImage] = useState("");
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({
    id: null,
    name: "",
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formValues, setFormValues] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/api/category");
        setCategory(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh mục", error);
      }
    };

    fetchData();
  }, []);

  const onFinish = (values) => {
    const productData = {
      ...values,
      image,
      metalWeight: 0,
      gemstoneWeight: 0,
      price: 0,
    };
    WebSocket.initializeProduct(productData);
    message.success("Product initialized for appraisal");
    form.resetFields();
    setImage("");
  };

  const getImageData = (data) => {
    setImage(data);
  };

  const showConfirmModal = (values) => {
    setFormValues(values);
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    setIsModalVisible(false);
    await onFinish(formValues);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleNoMetalChange = (e) => {
    setNoMetal(e.target.checked);
    if (e.target.checked) {
      form.setFieldsValue({
        metalType: "Không",
        metalWeight: 0,
      });
    }
  };

  const handleNoGemstoneChange = (e) => {
    setNoGemstone(e.target.checked);
    if (e.target.checked) {
      form.setFieldsValue({
        gemstoneType: "Không",
        gemstoneWeight: 0,
      });
    }
  };

  return (
    <div className="CreateProductBuyToAdd">
      <CustomWebcam setImageData={getImageData} />
      <Form form={form} layout="vertical" onFinish={showConfirmModal}>
        <Form.Item
          label="Tên"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Danh mục"
          name="category_id"
          rules={[{ required: true, message: "Vui lòng chọn danh mục" }]}
        >
          <Select
            onChange={(value, option) =>
              setSelectedCategory({ id: value, name: option.children })
            }
          >
            {category.map((option) => (
              <Option key={option.id} value={option.id}>
                {option.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Gửi
          </Button>
        </Form.Item>
      </Form>

      <Modal
        title="Xác nhận"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Bạn có chắc chắn muốn thêm sản phẩm này không?</p>
      </Modal>
    </div>
  );
}

export default CreateProductBuyToAdd;
