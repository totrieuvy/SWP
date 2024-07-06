import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Image,
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
import { convertUrlToFile } from "../../../utils/convertUrlToFile";
import { convertFileToImg } from "../../../utils/convertFileToImg";
import PromoCreateForm from "../../../page/promoCreate/Component/PromoCreateform";

const { Option } = Select;
function ManagerProduct() {
  const [data, setData] = React.useState([]);
  const [visible, setVisible] = useState(0); // 0: closed, 1: create, 2: update
  const [formVariable] = useForm();
  const [category, setCategory] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [oldData, setOldData] = useState({});
  const [imgUrl, setImgUrl] = useState("");
  const [isPromoCreateFormVisible, setIsPromoCreateFormVisible] =
    useState(false); // State for PromoCreateForm visibility

  const fetchData = async () => {
    try {
      const response = await api.get("/api/productSell");
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    document.title = "Danh sách sản phẩm";
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
      dataIndex: "pname",
      key: "pname",
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
      dataIndex: "category_name",
      key: "category_name",
      sorter: (a, b) => a.category_name.localeCompare(b.category_name),
    },
    {
      title: "Mô tả",
      dataIndex: "pdescription",
      key: "pdescription",
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
      title: "Giá nhà sản xuất",
      dataIndex: "manufactureCost",
      key: "manufactureCost",
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img src={image} alt="product" style={{ width: 50 }} />
      ),
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
      title: "Cập nhật",
      dataIndex: "productID",
      key: "productID",
      render: (productID, record) => (
        <Button
          type="primary"
          onClick={() => {
            setVisible(2);
            setOldData(record);
          }}
        >
          Cập nhật
        </Button>
      ),
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
    await api.delete(`/api/productSell/${productID}`);

    const listAfterDelete = data.filter(
      (product) => product.productID !== productID
    );

    setData(listAfterDelete);

    notification.success({
      message: "Thành công",
      description: "Xóa sản phẩm thành công",
    });
  };

  useEffect(() => {
    if (visible === 1) {
      formVariable.resetFields();
    } else if (visible === 2) {
      formVariable.setFieldsValue(oldData);
    }
  }, [visible, oldData, formVariable]);

  const handleOpenModal = () => {
    setVisible(1);
    formVariable.resetFields();
  };
  const handleCloseModal = () => {
    setVisible(0);
    setImgUrl("");
  };
  const handleOk = () => {
    formVariable.submit();
  };

  const handleFileChange = async ({ file }) => {
    console.log(file);
    setImageFile(file);
    const url = await convertFileToImg(file);
    setImgUrl(url);
  };

  const onFinish = async (values) => {
    console.log(values);
    try {
      if (visible === 1) {
        const formData = new FormData();
        if (imageFile) {
          formData.append("image", imageFile);
        }
        Object.keys(values).forEach((key) => formData.append(key, values[key]));
        try {
          const response = await api.post("/api/productSell", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          console.log(response);
          message.success("Product created successfully");
          setData([...data, response.data]);
        } catch (error) {
          message.error("Failed to create product");
        }
      } else if (visible === 2) {
        const oldImg = await convertUrlToFile(oldData.image);

        const imgUpdate = imgUrl ? imageFile : oldImg;

        const formData = new FormData();
        formData.append("image", imgUpdate);
        formData.append("carat", values.carat);
        formData.append("category_id", oldData.category_id);
        formData.append("chi", values.chi);
        formData.append("cost", oldData.cost);
        formData.append("gemstoneType", values.gemstoneType);
        formData.append("manufacturer", values.manufacturer);
        formData.append("manufactureCost", values.manufactureCost);
        formData.append("metalType", values.metalType);
        formData.append("productCode", values.productCode);
        formData.append("pname", values.pname);
        formData.append("pdescription", values.pdescription);

        // Send PUT request to update product
        const response = await api.put(
          `/api/productSell/${oldData.productID}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        // Update the product list
        const updatedData = data.map((product) =>
          product.productID === oldData.productID ? response.data : product
        );

        setData(updatedData);
        notification.success({
          message: "Thành công",
          description: "Cập nhật sản phẩm thành công",
        });
      }
    } catch (error) {
      console.error("Error during API call:", error);
    }

    setVisible(0);
  };

  return (
    <div>
      <h1>Quản lý sản phẩm</h1>
      <Button type="primary" onClick={handleOpenModal}>
        Thêm sản phẩm
      </Button>
      <Button
        type="primary"
        style={{ marginLeft: "20px" }}
        onClick={() => setIsPromoCreateFormVisible(true)}
      >
        Add Promotion
      </Button>
      <Table
        dataSource={data}
        columns={columns}
        rowKey={(record) => record.productID}
      />
      <Modal
        title={visible === 1 ? "Thêm sản phẩm" : "Cập nhật sản phẩm"}
        open={visible !== 0}
        onOk={handleOk}
        onCancel={handleCloseModal}
      >
        <Form form={formVariable} onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Tên sản phẩm"
            name="pname"
            rules={[{ required: true, message: "Tên sản phẩm là bắt buộc" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Loại sản phẩm"
            name="category_id"
            rules={[{ required: true, message: "Loại sản phẩm là bắt buộc" }]}
          >
            <Select>
              {category.map((item) => (
                <Option key={item.categoryID} value={item.categoryID}>
                  {item.categoryName}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Giá"
            name="cost"
            rules={[{ required: true, message: "Giá sản phẩm là bắt buộc" }]}
          >
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item label="Mô tả" name="pdescription">
            <Input.TextArea />
          </Form.Item>
          <Form.Item label="Đá" name="gemstoneType">
            <Input />
          </Form.Item>
          <Form.Item label="Nhà sản xuất" name="manufacturer">
            <Input />
          </Form.Item>
          <Form.Item label="Giá nhà sản xuất" name="manufactureCost">
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item label="Carat" name="carat">
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item label="Chỉ" name="chi">
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item label="Hình ảnh">
            <Upload
              name="image"
              beforeUpload={() => false}
              onChange={handleFileChange}
              showUploadList={false}
            >
              <Button icon={<UploadOutlined />}>Chọn hình ảnh</Button>
            </Upload>
            {imgUrl && (
              <Image
                src={imgUrl}
                alt="product"
                style={{ width: 100, marginTop: 10 }}
              />
            )}
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        footer={null}
        title="Create Promotion"
        open={isPromoCreateFormVisible}
        onCancel={() => setIsPromoCreateFormVisible(false)}
      >
        <PromoCreateForm />
      </Modal>
    </div>
  );
}

export default ManagerProduct;
