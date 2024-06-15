import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Select,
  Table,
  Tag,
  Upload,
  message,
  notification,
} from "antd";
import api from "../../../config/axios";
import { UploadOutlined } from "@ant-design/icons";

import "./ManagerProduct.css";
import { useForm } from "antd/es/form/Form";

const { Option } = Select;
function ManagerProduct() {
  const [data, setData] = React.useState([]);
  const [visible, setVisible] = useState(false);
  const [formVariable] = useForm();
  const [category, setCategory] = useState([]);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    document.title = "Danh sách sản phẩm";
    const fetchData = async () => {
      try {
        const response = await api.get("/api/productSell");
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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

  const columns = [
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Giá",
      dataIndex: "cost",
      key: "cost",
      sorter: (a, b) => a.cost - b.cost,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = status ? "geekblue" : "volcano";
        let text = status ? "IN STOCK" : "OUT OF STOCK";
        return (
          <Tag color={color} key={text}>
            {text}
          </Tag>
        );
      },
      sorter: (a, b) => (a.status === b.status ? 0 : a.status ? -1 : 1),
    },
    {
      title: "Loại",
      dataIndex: "metalType",
      key: "metalType",
      sorter: (a, b) => a.metalType.localeCompare(b.metalType),
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Đá",
      dataIndex: "gemstoneType",
      key: "gemstoneType",
      sorter: (a, b) => a.gemstoneType.localeCompare(b.gemstoneType),
    },
    {
      title: "Nhà sản xuất",
      dataIndex: "manufacturer",
      key: "manufacturer",
      sorter: (a, b) => a.manufacturer.localeCompare(b.manufacturer),
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      render: (image) => <img src={image} alt="product" style={{ width: 50 }} />,
    },
    {
      title: "Carat",
      dataIndex: "carat",
      key: "carat",
      sorter: (a, b) => a.carat - b.carat,
    },
    {
      title: "Chỉ",
      dataIndex: "chi",
      key: "chi",
      sorter: (a, b) => a.chi - b.chi,
    },
    {
      title: "Xóa",
      dataIndex: "productID",
      key: "productID",
      render: (productID) => (
        <Popconfirm
          title="Xóa sản phẩm"
          description="Bạn có chắc muốn xóa sản phẩm không?"
          onConfirm={() => handleDeleteProductSell(productID)}
          okText="Đồng ý"
          cancelText="Không"
        >
          <Button danger>Xóa</Button>
        </Popconfirm>
      ),
    },
  ];

  const handleDeleteProductSell = async (productID) => {
    await api.delete(`/api/productSell/delete/${productID}`);

    const listAfterDelete = data.filter((product) => product.productID !== productID);

    setData(listAfterDelete);

    notification.success({
      message: "Thành công",
      description: "Xóa sản phẩm thành công",
    });
  };

  const handleOpenModal = () => {
    setVisible(true);
  };
  const handleCloseModal = () => {
    setVisible(false);
  };
  const handleOk = () => {
    formVariable.submit();
  };

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
      .post("/api/productSell", formData, {
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
    <div className="productList">
      <Button type="primary" onClick={handleOpenModal}>
        Thêm sản phẩm
      </Button>
      <Table columns={columns} dataSource={data} />
      <Modal title="Thêm sản phẩm" open={visible} onCancel={handleCloseModal} onOk={handleOk}>
        <Form onFinish={onFinish} layout="vertical">
          <Form.Item name="pname" label="Product Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="pdescription" label="Product Description">
            <Input.TextArea />
          </Form.Item>

          <Form.Item name="productCode" label="Product Code" rules={[{ required: true }]}>
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

          <Form.Item name="category_id" label="Category" rules={[{ required: true }]}>
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
      </Modal>
    </div>
  );
}

export default ManagerProduct;
