import React, { useEffect, useState } from "react";
import { Layout, Card, Table, Input } from "antd";
import api from "../../../config/axios";

const { Sider, Content } = Layout;
const { Search } = Input;

const ViewGuarantee = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(false);

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
    <Card title="Customer Details">
      <p>ID: {customer.customerID}</p>
      <p>Name: {customer.customerName}</p>
    </Card>
  );

  // Orders Table Component
  const OrdersTable = ({ orders }) => {
    const columns = [
      { title: "Order ID", dataIndex: "orderID", key: "orderID" },
      { title: "Date", dataIndex: "purchaseDate", key: "purchaseDate" },
      {
        title: "Total",
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

  // Order Details and Guarantee Table Component
  const OrderDetailsAndGuaranteeTable = ({ orderDetails }) => {
    const columns = [
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
              <p>THời hạn bảo hành (tháng): {record.warrantyPeriodMonth}</p>
              <p>Mô tả: {record.pdescription}</p>
              <p>Tình trạng sản phẩm: {record.pstatus ? "Còn hoạt động" : "Không còn hoạt động"}</p>
              <p>Tình trạng bảo hành: {record.guaranteeStatus ? "Còn hoạt động" : "Không còn hoạt động"}</p>
              <p>Giá nhà sản xuất: {record.manufactureCost.toLocaleString()} VND</p>
            </>
          ),
        }}
      />
    );
  };

  // Customers Table Component
  const CustomersTable = ({ customers }) => {
    const columns = [
      { title: "ID", dataIndex: "customerID", key: "customerID" },
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
    </Layout>
  );
};

export default ViewGuarantee;
