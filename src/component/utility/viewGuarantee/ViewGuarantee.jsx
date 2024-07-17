import React, { useEffect, useState } from "react";
import { Layout, Card, Table, Input, Button, Form, Modal } from "antd";
import api from "../../../config/axios";

const { Sider, Content } = Layout;
const { Search } = Input;

const ViewGuarantee = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newOrderDetails, setNewOrderDetails] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    loadData(" ");
  }, []);

  const loadData = async (searchTerm) => {
    setLoading(true);
    try {
      const response = await api.get(`/api/order/search-customer-guarantee?search=${searchTerm}`);
      setCustomers(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  const handleSearch = (value) => {
    loadData(value);
  };

  // Customer Details Component
  const CustomerDetails = ({ customer }) => (
    <Card title="Thông tin khách hàng">
      <p>ID: {customer.customerID}</p>
      <p>Tên: {customer.customerName}</p>
      <p>Email: {customer.email}</p>
      <p>Số điện thoại: {customer.phoneNumber}</p>
      <p>Điểm: {customer.point}</p>
    </Card>
  );

  // Orders Table Component
  const OrdersTable = ({ orders }) => {
    const columns = [
      { title: "Mã đơn hàng", dataIndex: "orderID", key: "orderID" },
      { title: "Ngày mua", dataIndex: "purchaseDate", key: "purchaseDate" },
      {
        title: "Tổng",
        dataIndex: "totalAmount",
        key: "totalAmount",
        render: (text) => (text ? `${text.toLocaleString()} VND` : "N/A"),
      },
    ];

    return (
      <Table
        dataSource={orders}
        columns={columns}
        onRow={(record) => ({
          onClick: () => setSelectedOrder(record),
        })}
      />
    );
  };

  // Order Details and Guarantee Table Component
  const OrderDetailsAndGuaranteeTable = ({ orderDetails }) => {
    const columns = [
      { title: "Mã đơn hàng chi tiết", dataIndex: "orderDetailID", key: "pname" },
      { title: "Tên sản phẩm", dataIndex: "pname", key: "pname" },
      {
        title: "Ảnh",
        dataIndex: "image",
        key: "image",
        render: (text) => <img src={text} alt="Product" style={{ width: "50px", height: "50px" }} />,
      },
      {
        title: "Giá",
        dataIndex: "cost",
        key: "cost",
        render: (text) => (text ? `${text.toLocaleString()} VND` : "N/A"),
      },
      { title: "Số lượng", dataIndex: "quantity", key: "quantity" },
      {
        title: "Ngày hết hạn bảo hành",
        dataIndex: "guaranteeEndDate",
        key: "guaranteeEndDate",
        render: (text) => (text ? new Date(text).toLocaleDateString() : "N/A"),
      },
      { title: "Loại bảo hiểm", dataIndex: "coverage", key: "coverage" },
      {
        title: "Hoàn trả",
        dataIndex: "orderDetailID",
        key: "orderDetailID",
        render: (orderDetailID, record) => (
          <Button
            type="primary"
            onClick={() => {
              setSelectedProduct(record);
              form.setFieldsValue(record);
              setVisible(true);
            }}
          >
            Hoàn trả
          </Button>
        ),
      },
    ];

    return (
      <>
        <Table
          dataSource={orderDetails}
          columns={columns}
          scroll={{ x: true }}
          expandable={{
            expandedRowRender: (record) => (
              <>
                <p>Mã hóa đơn: {record.orderDetailID}</p>
                <p>Mã sản phẩm: {record.productCode}</p>
                <p>Nhà sản xuất: {record.manufacturer}</p>
                <p>Loại đá: {record.gemstoneType}</p>
                <p>Loại kim loại: {record.metalType}</p>
                <p>Chỉ: {record.chi}</p>
                <p>Carat: {record.carat}</p>
                <p>Thời hạn bảo hành (tháng): {record.warrantyPeriodMonth}</p>
                <p>Mô tả: {record.pdescription}</p>
                <p>Tình trạng sản phẩm: {record.pstatus ? "Còn hoạt động" : "Không còn hoạt động"}</p>
                <p>Tình trạng bảo hành: {record.guaranteeStatus ? "Còn hoạt động" : "Không còn hoạt động"}</p>
                <p>Giá nhà sản xuất: {record.manufactureCost ? record.manufactureCost.toLocaleString() : "N/A"} VND</p>
              </>
            ),
          }}
        />
        {newOrderDetails.length > 0 && (
          <Table
            dataSource={newOrderDetails}
            columns={[
              { title: "Mã đơn hàng chi tiết", dataIndex: "orderDetailID", key: "orderDetailID" },
              { title: "Số lượng", dataIndex: "quantity", key: "quantity" },
              { title: "Tên sản phẩm", dataIndex: "pname", key: "pname" },
              {
                title: "Ảnh",
                dataIndex: "image",
                key: "image",
                render: (image) => <img src={image} alt="Product" style={{ width: "50px", height: "50px" }} />,
              },
            ]}
            title={() => "Hóa đơn hoàn tiền"}
            scroll={{ x: true }}
            footer={() => (
              <Button type="primary" onClick={handleRefund}>
                Hoàn tiền
              </Button>
            )}
          />
        )}
      </>
    );
  };

  // Customers Table Component
  const CustomersTable = ({ customers }) => {
    const columns = [
      { title: "ID khách hàng", dataIndex: "customerID", key: "customerID" },
      {
        title: "Tên khách hàng",
        dataIndex: "customerName",
        key: "customerName",
      },
    ];

    return (
      <Table
        dataSource={customers}
        columns={columns}
        onRow={(record) => ({
          onClick: () => setSelectedCustomer(record),
        })}
      />
    );
  };

  const handleClose = () => {
    setVisible(false);
    form.resetFields();
  };

  const handleCreateOrder = (values) => {
    const newOrderDetail = { ...selectedProduct, ...values };
    setNewOrderDetails([...newOrderDetails, newOrderDetail]);
    handleClose();
  };

  const handleRefund = () => {
    const refundDetails = newOrderDetails.map((detail) => ({
      orderDetailID: detail.orderDetailID,
      quantity: detail.quantity,
      pname: detail.pname,
      image: detail.image,
    }));
    console.log(refundDetails);
    // Add your API call here to handle the refund
  };

  return (
    <Layout>
      <Sider width={400} style={{ background: "#fff" }}>
        <Search placeholder="Tìm kiếm khách hàng" onSearch={handleSearch} style={{ padding: "16px" }} />
        <CustomersTable customers={customers} />
      </Sider>
      <Content style={{ padding: "20px" }}>
        {selectedCustomer && (
          <>
            <CustomerDetails customer={selectedCustomer} />
            <OrdersTable orders={selectedCustomer.orders} />
          </>
        )}
        {selectedOrder && <OrderDetailsAndGuaranteeTable orderDetails={selectedOrder.orderDetails} />}
      </Content>
      <Modal title="Hoàn trả" open={visible} onCancel={handleClose} footer={null}>
        <Form form={form} layout="vertical" onFinish={handleCreateOrder}>
          <Form.Item
            name="orderDetailID"
            label="Mã chi tiết đơn hàng"
            rules={[{ required: true, message: "Mã chi tiết đơn hàng không được bỏ trống" }]}
          >
            <Input disabled={true} />
          </Form.Item>
          <Form.Item
            name="pname"
            label="Tên sản phẩm"
            rules={[{ required: true, message: "Tên sản phẩm không được bỏ trống" }]}
          >
            <Input disabled={true} />
          </Form.Item>
          <Form.Item
            name="productCode"
            label="Mã sản phẩm"
            rules={[{ required: true, message: "Mã sản phẩm không được bỏ trống" }]}
          >
            <Input disabled={true} />
          </Form.Item>
          <Form.Item
            name="manufacturer"
            label="Nhà sản xuất"
            rules={[{ required: true, message: "Nhà sản xuất không được bỏ trống" }]}
          >
            <Input disabled={true} />
          </Form.Item>
          <Form.Item
            name="gemstoneType"
            label="Loại đá"
            rules={[{ required: true, message: "Loại đá không được bỏ trống" }]}
          >
            <Input disabled={true} />
          </Form.Item>
          <Form.Item name="chi" label="Chỉ" rules={[{ required: true, message: "Chỉ không được bỏ trống" }]}>
            <Input disabled={true} />
          </Form.Item>
          <Form.Item name="carat" label="Carat" rules={[{ required: true, message: "Carat không được bỏ trống" }]}>
            <Input disabled={true} />
          </Form.Item>
          <Form.Item
            name="warrantyPeriodMonth"
            label="Thời hạn bảo hành (tháng)"
            rules={[{ required: true, message: "Thời hạn bảo hành không được bỏ trống" }]}
          >
            <Input disabled={true} />
          </Form.Item>
          <Form.Item
            name="pdescription"
            label="Mô tả"
            rules={[{ required: true, message: "Mô tả không được bỏ trống" }]}
          >
            <Input disabled={true} />
          </Form.Item>
          <Form.Item
            name="quantity"
            label="Số lượng"
            rules={[{ required: true, message: "Số lượng không được bỏ trống" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Tạo hóa đơn
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default ViewGuarantee;
