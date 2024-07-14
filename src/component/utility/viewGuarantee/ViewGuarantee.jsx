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
      { title: "Product Name", dataIndex: "pname", key: "pname" },
      {
        title: "Image",
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
        title: "Price",
        dataIndex: "cost",
        key: "cost",
        render: (text) => `${text.toLocaleString()} VND`,
      },
      { title: "Quantity", dataIndex: "quantity", key: "quantity" },
      {
        title: "Guarantee End Date",
        dataIndex: "guaranteeEndDate",
        key: "guaranteeEndDate",
        render: (text) => new Date(text).toLocaleDateString(),
      },
      { title: "Coverage Type", dataIndex: "coverage", key: "coverage" },
    ];

    return (
      <Table
        dataSource={orderDetails}
        columns={columns}
        scroll={{ x: true }}
        expandable={{
          expandedRowRender: (record) => (
            <>
              <p>Order Detail ID: {record.orderDetailID}</p>
              <p>Product Code: {record.productCode}</p>
              <p>Manufacturer: {record.manufacturer}</p>
              <p>Gemstone Type: {record.gemstoneType}</p>
              <p>Metal Type: {record.metalType}</p>
              <p>Chi: {record.chi}</p>
              <p>Carat: {record.carat}</p>
              <p>Warranty Period (Months): {record.warrantyPeriodMonth}</p>
              <p>Description: {record.pdescription}</p>
              <p>Product Status: {record.pstatus ? "Active" : "Inactive"}</p>
              <p>
                Guarantee Status:{" "}
                {record.guaranteeStatus ? "Active" : "Inactive"}
              </p>
              <p>
                Manufacture Cost: {record.manufactureCost.toLocaleString()} VND
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
      { title: "Customer ID", dataIndex: "customerID", key: "customerID" },
      {
        title: "Customer Name",
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
          placeholder="Search customers"
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
