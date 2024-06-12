import React, { useState } from "react";
import { Form, Input, InputNumber, Checkbox, Button } from "antd";
import CustomWebcam from "./CustomWebcam";

function CreateProductBuyToAdd() {
  const [noMetal, setNoMetal] = useState(false);
  const [noGemstone, setNoGemstone] = useState(false);
  const [image, setImage] = useState("");

  const onFinish = (values) => {
    console.log("Form values:", values);
  };

  const getImageData = (data) => {
    setImage(data);
    console.log(data);
  };

  const handleProductBuy = () => {
    console.log("hello world");
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
          label="Metal Type"
          name="metalType"
          rules={[
            { required: !noMetal, message: "Please enter the metal type" },
          ]}
        >
          <Input disabled={noMetal} />
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
          <Input disabled={noGemstone} />
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
