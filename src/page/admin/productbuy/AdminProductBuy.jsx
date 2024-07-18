import { Button, Modal, notification, Popconfirm, Table, Form, Input } from "antd";
import api from "../../../config/axios";
import React, { useEffect, useState } from "react";

function AdminProductBuy() {
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [form] = Form.useForm();

  React.useEffect(() => {
    document.title = "Sản phẩm mua";
  }, []);

  const fetchData = async () => {
    const response = await api.get("/api/productBuy");
    const responseTrue = response.data.filter((data) => data.pbStatus === true);
    setData(responseTrue);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "pbName",
      key: "pbName",
    },
    {
      title: "Tên thể loại",
      dataIndex: "categoryName",
      key: "categoryName",
    },
    {
      title: "Loại kim loại",
      dataIndex: "metalType",
      key: "metalType",
    },
    {
      title: "Chỉ",
      dataIndex: "chi",
      key: "chi",
    },
    {
      title: "Carat",
      dataIndex: "carat",
      key: "carat",
    },
    {
      title: "Giá",
      dataIndex: "cost",
      key: "cost",
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      render: (image) => <img src={image} alt="product" style={{ width: 50 }} />,
    },
    {
      title: "Cập nhật",
      dataIndex: "productBuyID",
      key: "productBuyID",
      render: (productBuyID, record) => (
        <Button
          type="primary"
          onClick={() => {
            setSelectedProduct(record);
            form.setFieldsValue(record);
            setVisible(true);
          }}
        >
          Cập nhật
        </Button>
      ),
    },
    {
      title: "Xóa",
      dataIndex: "productBuyID",
      key: "productBuyID",
      render: (productBuyID) => (
        <Popconfirm
          title="Xóa sản phẩm"
          description="Bạn có chắc muốn xóa sản phẩm không?"
          onConfirm={() => handleDeleteProductBuy(productBuyID)}
          okText="Đồng ý"
          cancelText="Không"
        >
          <Button danger>Xóa</Button>
        </Popconfirm>
      ),
    },
  ];

  const handleDeleteProductBuy = async (productBuyID) => {
    await api.delete(`/api/productBuy/${productBuyID}`);

    const listAfterDelete = data.filter((product) => product.productBuyID !== productBuyID);

    setData(listAfterDelete);

    notification.success({
      message: "Thành công",
      description: "Xóa sản phẩm thành công",
    });
  };

  const handleUpdate = async (values) => {
    try {
      await api.put(`/api/productBuy/${selectedProduct.productBuyID}`, values);
      const updatedData = data.map((product) =>
        product.productBuyID === selectedProduct.productBuyID ? { ...product, ...values } : product
      );
      setData(updatedData);
      setVisible(false);
      notification.success({
        message: "Thành công",
        description: "Cập nhật sản phẩm thành công",
      });
    } catch (error) {
      notification.error({
        message: "Lỗi",
        description: "Có lỗi xảy ra khi cập nhật sản phẩm",
      });
    }
  };

  const handleClose = () => {
    setVisible(false);
    form.resetFields();
  };
  return (
    <div>
      <Table dataSource={data} columns={columns} rowKey="productBuyID" />
      <Modal title="Cập nhật thông tin sản phẩm mua" open={visible} onCancel={handleClose} footer={null}>
        <Form form={form} layout="vertical" onFinish={handleUpdate}>
          <Form.Item
            name="pbName"
            label="Tên sản phẩm"
            rules={[{ required: true, message: "Tên sản phẩm không được bỏ trống" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="categoryName"
            label="Tên thể loại"
            rules={[{ required: true, message: "Tên thể loại không được bỏ trống" }]}
          >
            <Input disabled={true} />
          </Form.Item>
          <Form.Item
            name="metalType"
            label="Loại kim loại"
            rules={[{ required: true, message: "Loại kim loại không được bỏ trống" }]}
          >
            <Input disabled={true} />
          </Form.Item>
          <Form.Item name="chi" label="Chỉ" rules={[{ required: true, message: "Chỉ không được bỏ trống" }]}>
            <Input disabled={true} />
          </Form.Item>
          <Form.Item name="carat" label="Carat" rules={[{ required: true, message: "Carat không được bỏ trống" }]}>
            <Input disabled={true} />
          </Form.Item>
          <Form.Item name="cost" label="Giá" rules={[{ required: true, message: "Giá không được bỏ trống" }]}>
            <Input disabled={true} />
          </Form.Item>
          <Form.Item name="image" label="Ảnh" rules={[{ required: true, message: "Ảnh không được bỏ trống" }]}>
            <Input disabled={true} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default AdminProductBuy;
