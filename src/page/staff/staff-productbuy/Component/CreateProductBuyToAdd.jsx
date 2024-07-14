import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Checkbox,
  Button,
  Select,
  Modal,
} from "antd";
import CustomWebcam from "./CustomWebcam";
import api from "../../../../config/axios";
import { Option } from "antd/es/mentions";

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

  const fetchPrice = async (values) => {
    try {
      const response = await api.post("/api/productBuy/calculate-cost", {
        metalType: values.metalType,
        gemstoneType: values.gemstoneType,
        metalWeight: values.metalWeight,
        gemstoneWeight: values.gemstoneWeight,
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
    return 0;
  };

  const onFinish = async (values) => {
    const calculatedPrice = await fetchPrice(values);
    const productData = {
      ...values,
      category_id: selectedCategory.id,
      category: selectedCategory.name,
      image,
      calculatedPrice: calculatedPrice * 1000,
    };
    console.log(productData);
    appendOrder(productData);
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

        <Form.Item>
          <Checkbox onChange={handleNoMetalChange}>Không kim loại</Checkbox>
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

        <Form.Item
          label="Loại kim loại"
          name="metalType"
          rules={[
            { required: !noMetal, message: "Vui lòng nhập loại kim loại" },
          ]}
        >
          <Select disabled={noMetal}>
            <Option value="Vàng">Vàng</Option>
            <Option value="Không">Không</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Trọng lượng kim loại (Chi)"
          name="metalWeight"
          rules={[
            {
              required: !noMetal,
              type: "number",
              min: 0,
              max: 100,
              message:
                "Vui lòng nhập trọng lượng kim loại lớn hơn 0 hoặc bé hơn 100",
            },
          ]}
        >
          <InputNumber disabled={noMetal} min={0} max={100} />
        </Form.Item>

        <Form.Item>
          <Checkbox onChange={handleNoGemstoneChange}>Không có đá quý</Checkbox>
        </Form.Item>

        <Form.Item
          label="Loại đá quý"
          name="gemstoneType"
          rules={[
            {
              required: !noGemstone,
              message: "Vui lòng nhập loại đá quý",
            },
          ]}
        >
          <Select disabled={noGemstone}>
            <Option value="Kim cương">Kim cương</Option>
            <Option value="Không">Không</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Trọng lượng đá quý (Carat)"
          name="gemstoneWeight"
          rules={[
            {
              required: !noGemstone,
              type: "number",
              min: 0,
              max: 2,
              message: "Vui lòng nhập trọng lượng đá quý từ 1 đến 2",
            },
          ]}
        >
          <InputNumber disabled={noGemstone} min={0} max={2} />
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
