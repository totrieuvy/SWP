import React from "react";
import { Button, Cascader, DatePicker, Form, Input, InputNumber, Mentions, Select, TreeSelect } from "antd";
import api from "../../../config/axios";
const options = [];
const category = api.get("/category/readAll").then((response) => {
  var data = response.data;
  data.forEach((item) => {
    let newOption = {
      label: item.name,
      vallue: item.name,
      children: new Array(20).fill(null).map((_, index) => ({
        label: `Number ${index}`,
        value: index,
      })),
    };
    options.push(newOption);
  });
});

const { RangePicker } = DatePicker;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 10,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 20,
    },
  },
};
const handleChange = (value) => {
  console.log(value);
};
const { Option } = Select;

const PromoCreateform = () => (
  <Form
    {...formItemLayout}
    variant="filled"
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
export default PromoCreateform;
