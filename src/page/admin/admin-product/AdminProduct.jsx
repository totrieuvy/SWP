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

import "./AdminProduct.css";
import { useForm } from "antd/es/form/Form";
import { convertUrlToFile } from "../../../utils/convertUrlToFile";
import { convertFileToImg } from "../../../utils/convertFileToImg";

const { Option } = Select;

function AdminProduct() {
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(0); // 0: closed, 1: create, 2: update
  const [form] = useForm();
  const [category, setCategory] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [oldData, setOldData] = useState({});
  const [imgUrl, setImgUrl] = useState("");
  const [disableChi, setDisableChi] = useState(false); // State for disabling chi field
  const [disableCarat, setDisableCarat] = useState(false); // State for disabling carat field

  const fetchData = async () => {
    try {
      const response = await api.get("/api/productSell");
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
    const fetchCategories = async () => {
      try {
        const response = await api.get("/api/category");
        setCategory(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "pname",
      key: "pname",
      sorter: (a, b) => a.pname.localeCompare(b.pname),
    },
    {
      title: "Mã sản phẩm",
      dataIndex: "productCode",
      key: "productCode",
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
        const color = status ? "geekblue" : "volcano";
        const text = status ? "IN STOCK" : "OUT OF STOCK";
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
        <Image src={image} alt="product" style={{ width: 50 }} />
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
    try {
      await api.delete(`/api/productSell/${productID}`);
      setData(data.filter((product) => product.productID !== productID));
      notification.success({
        message: "Thành công",
        description: "Xóa sản phẩm thành công",
      });
    } catch (error) {
      console.error("Failed to delete product:", error);
      notification.error({
        message: "Lỗi",
        description: "Xóa sản phẩm thất bại",
      });
    }
  };

  useEffect(() => {
    if (visible === 1) {
      form.resetFields();
    } else if (visible === 2) {
      form.setFieldsValue(oldData);
    }
  }, [visible, oldData, form]);

  const handleOpenModal = () => {
    setVisible(1);
    form.resetFields();
  };

  const handleCloseModal = () => {
    setVisible(0);
    setImgUrl("");
  };

  const handleOk = () => {
    form.submit();
  };

  const handleFileChange = async ({ file }) => {
    console.log(file);
    setImageFile(file);
    const url = await convertFileToImg(file);
    setImgUrl(url);
  };
  const onFinish = async (values) => {
    try {
      if (visible === 1) {
        const formData = new FormData();
        if (imageFile) {
          formData.append("image", imageFile);
        }
        Object.keys(values).forEach((key) => formData.append(key, values[key]));

        const response = await api.post("/api/productSell", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        setData([...data, response.data]);
        message.success("Product created successfully");
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

        await api.put(`/api/productSell/${oldData.productID}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        fetchData();
        notification.success({
          message: "Thành công",
          description: "Cập nhật sản phẩm thành công",
        });
      }
    } catch (error) {
      console.error("Failed to submit form:", error);
      message.error("Failed to submit form");
    }

    form.resetFields();
    handleCloseModal();
  };

  return (
    <div className="productList">
      <Button type="primary" onClick={handleOpenModal}>
        Thêm sản phẩm
      </Button>
      <Table columns={columns} dataSource={data} />
      <Modal
        title={visible === 1 ? "Thêm sản phẩm" : "Cập nhật sản phẩm"}
        visible={visible !== 0}
        onCancel={handleCloseModal}
        onOk={handleOk}
        destroyOnClose
      >
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            name="pname"
            label="Tên sản phẩm"
            rules={[{ required: true, message: "Hãy nhập tên sản phẩm" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="pdescription"
            label="Mô tả sản phẩm"
            rules={[{ required: true, message: "Hãy nhập mô tả sản phẩm" }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="category_id"
            label="Loại sản phẩm"
            rules={[{ required: true, message: "hãy chọn loại sản phẩm" }]}
          >
            <Select placeholder="Select a category">
              {category.map((category) => (
                <Option key={category.id} value={category.id}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="productCode"
            label="Mã sản phẩm"
            rules={[{ required: true, message: "Hãy nhập mã sản phẩm" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="cost"
            label="Giá sản phẩm"
            rules={[{ required: true, message: "Hãy nhập giá sản phẩm" }]}
          >
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item
            name="metalType"
            label="Loại kim loại"
            rules={[{ required: true, message: "Hãy chọn loại kim loại" }]}
          >
            <Select
              placeholder="Chọn loại kim loại"
              onChange={(value) => {
                if (value === "Không") {
                  form.setFieldsValue({ chi: 0 });
                  setDisableChi(true);
                } else {
                  setDisableChi(false);
                }
              }}
            >
              <Option value="Vàng">Vàng</Option>
              <Option value="Không">Không</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="gemstoneType"
            label="Loại đá quý"
            rules={[{ required: true, message: "Hãy chọn loại đá quý" }]}
          >
            <Select
              placeholder="Chọn loại đá quý"
              onChange={(value) => {
                if (value === "Không") {
                  form.setFieldsValue({ carat: 0 });
                  setDisableCarat(true);
                } else {
                  setDisableCarat(false);
                }
              }}
            >
              <Option value="Kim cương">Kim cương</Option>
              <Option value="Không">Không</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="chi"
            label="Chỉ"
            rules={[
              { required: true, message: "Hãy nhập số chỉ" },
              { type: "number", min: 0, max: 10, message: "Chỉ từ 0 đến 10" },
            ]}
          >
            <InputNumber disabled={disableChi} min={0} max={10} />
          </Form.Item>
          <Form.Item
            name="carat"
            label="Carat"
            rules={[
              { required: true, message: "Hãy nhập số carat" },
              { type: "number", min: 0, max: 2, message: "Carat từ 0 đến 2" },
            ]}
          >
            <InputNumber disabled={disableCarat} min={0} max={2} />
          </Form.Item>
          <Form.Item
            name="manufacturer"
            label="Nhà sản xuất"
            rules={[{ required: true, message: "Hãy nhập nhà sản xuất" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="manufactureCost"
            label="Giá nhà sản xuất"
            rules={[
              { required: true, message: "Hãy nhập giá nhà sản xuất" },
              {
                type: "number",
                min: 0,
                message: "Giá nhà sản xuất không được nhỏ hơn 0",
              },
            ]}
          >
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item
            label="Ảnh"
            rules={[{ required: true, message: "hãy nhập ảnh sản phẩm" }]}
          >
            <Upload
              beforeUpload={() => false}
              showUploadList={false}
              onChange={handleFileChange}
            >
              <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload>
            {visible == 2 && !imgUrl ? (
              <div>
                <Image width={100} height={100} src={oldData.image} />
              </div>
            ) : (
              <div>
                <Image src={imgUrl} />
              </div>
            )}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default AdminProduct;
