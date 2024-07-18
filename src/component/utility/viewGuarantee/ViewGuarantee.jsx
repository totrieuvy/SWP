import React, { useEffect, useState } from "react";
import {
  Layout,
  Card,
  Table,
  Input,
  Button,
  message,
  Modal,
  Form,
  InputNumber,
} from "antd";
import api from "../../../config/axios";

const { Sider, Content } = Layout;
const { Search } = Input;

const ViewGuarantee = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm(); // Move useForm hook to the top level

  useEffect(() => {
    loadData(" ");
  }, []);

  const loadData = async (searchTerm) => {
    setLoading(true);
    try {
      const response = await api.get(
        `/api/order/search-customer-guarantee?search=${searchTerm}`
      );
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
    <Card title="Chi tiết khách hàng">
      <p>ID: {customer.customerID}</p>
      <p>Tên: {customer.customerName}</p>
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
        render: (text) => `${text.toLocaleString()} VND`,
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

  const handleRefund = (orderDetail) => {
    Modal.confirm({
      title: "Xác nhận hoàn tiền",
      content: (
        <Form form={form}>
          <Form.Item
            label="Lý do hoàn tiền"
            name="refundReason"
            rules={[
              { required: true, message: "Vui lòng nhập lý do hoàn tiền" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Số lượng hoàn tiền"
            name="quantityToRefund"
            rules={[
              { required: true, message: "Vui lòng nhập số lượng hoàn tiền" },
            ]}
          >
            <InputNumber min={1} max={orderDetail.quantity} />
          </Form.Item>
        </Form>
      ),
      onOk: async () => {
        try {
          const values = await form.validateFields();
          const response = await api.post("/api/order/refund", {
            orderDetailId: orderDetail.orderDetailID,
            refundReason: values.refundReason,
            quantityToRefund: parseInt(values.quantityToRefund, 10),
          });

          if (response.data.includes("successfully")) {
            message.success("Hoàn tiền thành công");
            loadData(""); // Reload data after successful refund
          } else {
            message.error("Hoàn tiền thất bại");
          }
        } catch (error) {
          if (error.response && error.response.data) {
            switch (error.response.data) {
              case "OrderDetail not found":
                message.error("Không tìm thấy chi tiết đơn hàng");
                break;
              case "Refund quantity exceeds available quantity":
                message.error("Số lượng hoàn tiền vượt quá số lượng có sẵn");
                break;
              case "This order is not eligible for refund":
                message.error("Đơn hàng này không đủ điều kiện hoàn tiền");
                break;
              default:
                message.error("Đã xảy ra lỗi khi xử lý hoàn tiền");
            }
          } else {
            console.error("Error processing refund:", error);
            message.error("Đã xảy ra lỗi khi xử lý hoàn tiền");
          }
        }
      },
    });
  };

  // Order Details and Guarantee Table Component
  const OrderDetailsAndGuaranteeTable = ({ orderDetails }) => {
    const columns = [
      { title: "Tên sản phẩm", dataIndex: "pname", key: "pname" },
      {
        title: "Ảnh",
        dataIndex: "image",
        key: "image",
        render: (text) => (
          <img
            src={text}
            alt="Product"
            style={{ width: "50px", height: "50px" }}
          />
        ),
      },
      {
        title: "Giá",
        dataIndex: "cost",
        key: "cost",
        render: (text) => `${text.toLocaleString()} VND`,
      },
      { title: "Số lượng", dataIndex: "quantity", key: "quantity" },
      {
        title: "Ngày hết hạn bảo hành",
        dataIndex: "guaranteeEndDate",
        key: "guaranteeEndDate",
        render: (text) => new Date(text).toLocaleDateString(),
      },
      { title: "Loại bảo hiểm", dataIndex: "coverage", key: "coverage" },
      {
        title: "Thao tác",
        key: "actions",
        render: (_, record) => (
          <Button onClick={() => handleRefund(record)}>Hoàn tiền</Button>
        ),
      },
    ];

    return (
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
              <p>
                Tình trạng sản phẩm:{" "}
                {record.pstatus ? "Còn hoạt động" : "Không còn hoạt động"}
              </p>
              <p>
                Tình trạng bảo hành:{" "}
                {record.guaranteeStatus
                  ? "Còn hoạt động"
                  : "Không còn hoạt động"}
              </p>
              <p>
                Giá nhà sản xuất: {record.manufactureCost.toLocaleString()} VND
              </p>
            </>
          ),
        }}
      />
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

  return (
    <Layout>
      <Sider width={400} style={{ background: "#fff" }}>
        <Search
          placeholder="Tìm kiếm khách hàng"
          onSearch={handleSearch}
          style={{ padding: "16px" }}
        />
        <CustomersTable customers={customers} />
      </Sider>
      <Content style={{ padding: "20px" }}>
        {selectedCustomer && (
          <>
            <CustomerDetails customer={selectedCustomer} />
            <OrdersTable orders={selectedCustomer.orders} />
          </>
        )}
        {selectedOrder && (
          <OrderDetailsAndGuaranteeTable
            orderDetails={selectedOrder.orderDetails}
          />
        )}
      </Content>
    </Layout>
  );
};

export default ViewGuarantee;
