import React from "react";
import { Button, Cascader, DatePicker, Form, Input, InputNumber, Mentions, Select, TreeSelect } from "antd";

import api from "../../../config/axios";

const { RangePicker } = DatePicker;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 10 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

const handleChange = (value) => {
  console.log(value);
};

const PromoCreateForm = () => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchCategoriesAndProducts = async () => {
      try {
        const [categoriesResponse, productsResponse] = await Promise.all([
          api.get("api/category"),
          api.get("api/productSell"),
        ]);

        const categories = categoriesResponse.data;
        const products = productsResponse.data;
        console.log(categories);
        console.log(products);
        const newOptions = categories.map((category) => ({
          label: category.name,
          value: category.id,
          key: `category-${category.id}`, // Ensure unique keys for categories
          children: products
            .filter((product) => product.category_id === category.id)
            .map((product) => ({
              label: product.name,
              value: product.id,
              key: `product-${product.id}-${product.category_id}`, // Ensure unique keys for products
            })),
        }));

        setOptions(newOptions);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCategoriesAndProducts();
  }, []);

  return (
    <Form
      {...formItemLayout}
      style={{
        maxWidth: 600,
      }}
    >
      <Form.Item
        label="Tên"
        name="Name"
        rules={[
          {
            required: true,
            message: "Please input!",
          },
        ]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        label="Phần trăm khuyến mãi"
        name="percentage"
        rules={[
          {
            required: true,
            message: "Please input!",
          },
        ]}
      >
        <InputNumber
          style={{
            width: "100%",
          }}
        />
      </Form.Item>

      <Form.Item
        label="Mô tả"
        name="description"
        rules={[
          {
            required: true,
            message: "Please input!",
          },
        ]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        label="Ngày bắt đầu - Ngày kết thúc"
        name="RangePicker"
        rules={[
          {
            required: true,
            message: "Please input!",
          },
        ]}
      >
        <RangePicker />
      </Form.Item>

      <Form.Item label="Sản phẩm" name="Product">
        <Cascader
          style={{
            width: "100%",
          }}
          options={options}
          onChange={handleChange}
          multiple
          maxTagCount="responsive"
        />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 7,
          span: 30,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PromoCreateForm;
