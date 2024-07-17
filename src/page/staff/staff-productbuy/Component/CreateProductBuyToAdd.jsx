import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, Modal, message } from "antd";
import CustomWebcam from "./CustomWebcam";
import api from "../../../../config/axios";
import WebSocket from "../../../../config/WebSocket";

const { Option } = Select;

function CreateProductBuyToAdd({ appendOrder }) {
  const [form] = Form.useForm();
  const [image, setImage] = useState("");
  const [category, setCategory] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

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

  const turnImageToUrl = async (imageData) => {
    const response = await api.post("/images/uploadByPath", {
      image: imageData,
    });
    return response.data;
  };

  const onFinish = async (values) => {
    const imageUrl = await turnImageToUrl(image);

    const productData = {
      ...values,
      image: imageUrl,
      metalWeight: 0,
      gemstoneWeight: 0,
      price: 0,
    };
    console.log(productData);
    WebSocket.initializeProduct(productData);
    message.success("Product initialized for appraisal");
    form.resetFields();
    setImage("");
  };

  const getImageData = (data) => {
    setImage(data);
  };

  const showConfirmModal = (values) => {
    setIsModalVisible(true);
    onFinish(values);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
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
          <Select>
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
