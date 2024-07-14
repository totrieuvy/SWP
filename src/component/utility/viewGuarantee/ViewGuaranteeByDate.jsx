import React, { useEffect, useState } from "react";
import { Layout, Card, Table, DatePicker } from "antd";
import api from "../../../config/axios";
import moment from "moment";

const { Content } = Layout;
const { RangePicker } = DatePicker;

const ViewGuaranteeByDate = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState([
    moment().startOf("year"),
    moment().endOf("year"),
  ]);

  useEffect(() => {
    loadData(dateRange[0], dateRange[1]);
  }, []);

  const loadData = async (startDate, endDate) => {
    setLoading(true);
    try {
      const response = await api.get(
        `/api/order/search-order-date-guarantee?startTime=${startDate.format(
          "YYYY-MM-DD"
        )}&endTime=${endDate.format("YYYY-MM-DD")}`
      );
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  const handleDateRangeChange = (dates) => {
    setDateRange(dates);
    loadData(dates[0], dates[1]);
  };

  // Orders Table Component
  const OrdersTable = ({ orders }) => {
    const columns = [
      { title: "Customer ID", dataIndex: "customerID", key: "customerID" },
      {
        title: "Customer Name",
        dataIndex: "customerName",
        key: "customerName",
      },
      {
        title: "Order ID",
        dataIndex: ["orders", "0", "orderID"],
        key: "orderID",
        render: (text, record) => record.orders[0]?.orderID,
      },
      {
        title: "Purchase Date",
        dataIndex: ["orders", "0", "purchaseDate"],
        key: "purchaseDate",
        render: (text, record) =>
          moment(record.orders[0]?.purchaseDate).format("YYYY-MM-DD HH:mm:ss"),
      },
      {
        title: "Total Amount",
        dataIndex: ["orders", "0", "totalAmount"],
        key: "totalAmount",
        render: (text, record) =>
          `${record.orders[0]?.totalAmount.toLocaleString()} VND`,
      },
      {
        title: "Staff Name",
        dataIndex: ["orders", "0", "staffName"],
        key: "staffName",
        render: (text, record) => record.orders[0]?.staffName,
      },
    ];

    return (
      <Table
        dataSource={orders}
        columns={columns}
        onRow={(record) => ({
          onClick: () => setSelectedOrder(record.orders[0]),
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
        render: (text) => moment(text).format("YYYY-MM-DD"),
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

  return (
    <Layout>
      <Content style={{ padding: "20px" }}>
        <Card title="Search Orders by Date Range">
          <RangePicker
            value={dateRange}
            onChange={handleDateRangeChange}
            style={{ marginBottom: "16px" }}
          />
          <OrdersTable orders={orders} />
        </Card>
        {selectedOrder && (
          <Card
            title={`Order Details - Order ID: ${selectedOrder.orderID}`}
            style={{ marginTop: "20px" }}
          >
            <OrderDetailsAndGuaranteeTable
              orderDetails={selectedOrder.orderDetails}
            />
          </Card>
        )}
      </Content>
    </Layout>
  );
};

export default ViewGuaranteeByDate;
