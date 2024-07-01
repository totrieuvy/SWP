import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, Checkbox, Button, Select } from "antd";
import CustomWebcam from "./CustomWebcam";
import api from "../../../../config/axios";
import { Option } from "antd/es/mentions";

function CreateProductBuyToAdd({ appendOrder }) {
  const [noMetal, setNoMetal] = useState(false);
  const [noGemstone, setNoGemstone] = useState(false);
  const [image, setImage] = useState("");
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({
    id: null,
    name: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`api/category`);
        setCategory(response.data);
      } catch (error) {
        console.error("Error fetching the order", error);
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

  return (
    <div className="CreateProductBuyToAdd">
      <CustomWebcam setImageData={getImageData} />
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter the name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Checkbox onChange={(e) => setNoMetal(e.target.checked)}>
            No Metal
          </Checkbox>
        </Form.Item>

        <Form.Item
          label="Category"
          name="category_id"
          rules={[{ required: true, message: "Please input!" }]}
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
          label="Metal Type"
          name="metalType"
          rules={[
            { required: !noMetal, message: "Please enter the metal type" },
          ]}
        >
          <Select disabled={noMetal}>
            <Option value="Gold">Gold</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Metal Weight"
          name="metalWeight"
          rules={[
            { required: !noMetal, message: "Please enter the metal weight" },
          ]}
        >
          <InputNumber disabled={noMetal} />
        </Form.Item>

        <Form.Item>
          <Checkbox onChange={(e) => setNoGemstone(e.target.checked)}>
            No Gemstone
          </Checkbox>
        </Form.Item>

        <Form.Item
          label="Gemstone Type"
          name="gemstoneType"
          rules={[
            {
              required: !noGemstone,
              message: "Please enter the gemstone type",
            },
          ]}
        >
          <Select disabled={noGemstone}>
            <Option value="Diamond">Diamond</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Gemstone Weight"
          name="gemstoneWeight"
          rules={[
            {
              required: !noGemstone,
              message: "Please enter the gemstone weight",
            },
          ]}
        >
          <InputNumber disabled={noGemstone} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default CreateProductBuyToAdd;
